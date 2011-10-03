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

Handle<Value> Clipboard::New (const Arguments& args) {
    HandleScope scope;

    Clipboard *clip = new Clipboard ();
    clip->clip_changed_.data = clip;

    // Init libev stuff
    ev_async_init (&clip->clip_changed_, on_clip_changed);
    ev_async_start (EV_DEFAULT_UC_ &clip->clip_changed_);
    ev_unref (EV_DEFAULT_UC);

    clip->Wrap (args.This ());
    return args.This ();
}

Handle<Value> Clipboard::Paste (const Arguments& args) {
    HandleScope scope;
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

