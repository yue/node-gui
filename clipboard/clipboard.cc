#include "clipboard.h"
#ifdef WIN32
#else
    #include "impl_linux.h"
#endif

Clipboard::Clipboard ()
    : impl_ (new Impl (&clip_changed_))
{
}

Clipboard::~Clipboard () {
    ev_async_stop (EV_DEFAULT_UC_ &clip_changed_);
}

void Clipboard::Init (Handle<Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    t->SetClassName (String::NewSymbol ("Clipboard"));
    t->InstanceTemplate()->SetInternalFieldCount (1);

    NODE_SET_PROTOTYPE_METHOD (t, "paste", Paste);
    target->Set (String::NewSymbol ("Clipboard"), t->GetFunction ());
}

Handle<Value> Clipboard::New (const Arguments& args) {
    HandleScope scope;

    Clipboard *clip = new Clipboard ();
    clip->Wrap (args.This ());
    clip->clip_changed_.data = clip;

    // Init libev stuff
    ev_async_init (&clip->clip_changed_, on_clip_changed);
    ev_async_start (EV_DEFAULT_UC_ &clip->clip_changed_);
    ev_unref (EV_DEFAULT_UC);

    return scope.Close (args.This ());
}

Handle<Value> Clipboard::Paste (const Arguments& args) {
    HandleScope scope;

    if (args.Length () == 1 && args[0]->IsString ()) {
        Clipboard *self = ObjectWrap::Unwrap<Clipboard> (args.This());

        // TODO
        // Should be called in the gtk main thread
        self->impl_->set_data (*String::Utf8Value (args[0]));
    }

    return v8::Undefined ();
}

void Clipboard::on_clip_changed (EV_P_ ev_async *w, int revents) {
    Clipboard *self = static_cast<Clipboard*> (w->data);

    HandleScope scope;

    // Read data from clipboard
    self->impl_->lock ();
    Local<String> data = String::New (self->impl_->get_data ());
    self->impl_->unlock ();

    // Then send it
    Local<Value> argv[] = { String::New ("copy"), data };

    Local<Value> emit_v = self->handle_->Get (String::New ("emit"));
    Local<Function> emit = Local<Function>::Cast(emit_v);

    emit->Call(self->handle_, 2, argv);
}

