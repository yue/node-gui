#include "impl_mainloop_gtk.h"
#include "impl_builder_gtk.hpp"
#include "node_gui_builder.h"
#include "node_gui_widget.h"

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))

namespace clip {
Persistent<FunctionTemplate> Builder::constructor_template;

Builder::Builder () :
    impl_ (new BuilderImpl ())
{
}

void Builder::Init (Handle<v8::Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    constructor_template = Persistent<FunctionTemplate>::New(t);
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);
    constructor_template->SetClassName(String::NewSymbol("Builder"));

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "destroy", Destroy);
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "get", Get);
    target->Set (String::NewSymbol ("Builder"), t->GetFunction ());
}

Handle<Value> Builder::New (const Arguments& args) {
    HandleScope scope;

    Builder *self;

    if (args.Length () == 1 && args[0]->IsFunction ()) {
        // var builder = new Builder (callback);
        self = new Builder ();

        self->callback_ = Persistent<Function>::New (
                Local<Function>::Cast (args[0]));

        // In GTK
        MainLoop::push_job_gui ([=] {
            self->impl_->create ();

            // Notify the creation
            MainLoop::push_job_node (
                std::bind (&Builder::after_create, self));
        });
    } else if (args.Length () == 2 && args[0]->IsString ()
                                   && args[1]->IsFunction ())
    {
        // var builder = new Builder ('/path', callback);
        self = new Builder ();

        std::string filename = *String::Utf8Value (args[0]);
        self->callback_ = Persistent<Function>::New (
                Local<Function>::Cast (args[1]));

        // In GTK
        MainLoop::push_job_gui ([=] {
            self->impl_->create (filename);

            // Notify the creation
            MainLoop::push_job_node (
                std::bind (&Builder::after_create, self));
        });
    } else {
        return THROW_BAD_ARGS;
    }

    self->Wrap (args.This ());
    self->Ref ();
    return args.This ();
}

Handle<Value> Builder::Destroy (const Arguments& args) {
    HandleScope scope;

    // destroy gtk::builder
    Builder *self = ObjectWrap::Unwrap<Builder> (args.This());
    MainLoop::push_job_gui ([&] {
        self->impl_->destroy ();
    });

    return Undefined ();
}

Handle<Value> Builder::Get (const Arguments& args) {
    HandleScope scope;

    // var widget = builder.get ('window_name');
    if (args.Length () != 1 || !args[0]->IsString ())
    {
        return THROW_BAD_ARGS;
    }

    Builder *self = ObjectWrap::Unwrap<Builder> (args.This());

    // Gtk::Builder::get_widget, do it syncly
    Local<v8::Object> widget = 
    self->impl_->get_widget (*String::Utf8Value (args[0]));

    return scope.Close (widget);
}

void Builder::after_create () {
    HandleScope scope;

    // new Builder (function (builder) {
    //     builder.get ()
    //     ...
    // })
    Handle<Value> args[] = { handle_ };
    callback_->Call (handle_, 1, args);
}
} /* clip */
