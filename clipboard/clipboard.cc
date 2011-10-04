#include "clipboard.h"
#ifdef WIN32
#else
    #include "impl_linux.h"
#endif

Persistent<FunctionTemplate> Clipboard::constructor_template;

Clipboard::Clipboard () :
    ObjectWrap (),
    impl_ (new Impl (&clip_changed_))
{
}

Clipboard::~Clipboard () {
    ev_async_stop (EV_DEFAULT_UC_ &clip_changed_);
}

void Clipboard::Init (Handle<Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    constructor_template = Persistent<FunctionTemplate>::New(t);
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);
    constructor_template->SetClassName(String::NewSymbol("Clipboard"));

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "paste", Paste);
    target->Set (String::NewSymbol ("Clipboard"), t->GetFunction ());
}

Handle<Value> Clipboard::New (const Arguments& args) {
    HandleScope scope;

    Clipboard *clip = new Clipboard ();
    clip->clip_changed_.data = clip;

    // Init libev stuff
    ev_async_init (&clip->clip_changed_, on_clip_changed);
    ev_async_start (EV_DEFAULT_UC_ &clip->clip_changed_);

    clip->Wrap (args.This ());
    clip->Ref (); // Clipboard should never be garbege collected
    return args.This ();
}

Handle<Value> Clipboard::Paste (const Arguments& args) {
    HandleScope scope;

    if (args.Length () == 1 && args[0]->IsString ()) {
        Clipboard *self = ObjectWrap::Unwrap<Clipboard> (args.This());

        self->impl_->set_data (*String::Utf8Value (args[0]));
    }

    return v8::Undefined ();
}

void Clipboard::on_clip_changed (EV_P_ ev_async *w, int revents) {
    Clipboard *self = static_cast<Clipboard*> (w->data);

    HandleScope scope;

    // Read data from clipboard
    Local<String> data = String::New (self->impl_->get_data ());

    // Then send it
    Local<Value> argv[] = { String::New ("copy"), data };

    Local<Value> emit_v = self->handle_->Get (String::New ("emit"));
    Local<Function> emit = Local<Function>::Cast(emit_v);

    emit->Call(self->handle_, 2, argv);
}

