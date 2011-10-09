#include <string>
#include <glib-object.h>
#include <gdk/gdk.h>
#include <gtk/gtk.h>

#include "impl_mainloop_gtk.h"
#include "node_gui_builder.h"
#include "node_gui_widget.h"

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))

namespace clip {
Persistent<FunctionTemplate> Builder::constructor_template;

Builder::~Builder () {
    if (host_ && obj_)
        g_object_unref (obj_);
}

void Builder::Init (Handle<v8::Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    constructor_template = Persistent<FunctionTemplate>::New(t);
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);
    constructor_template->SetClassName(String::NewSymbol("Builder"));

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "get", Get);
    target->Set (String::NewSymbol ("Builder"), t->GetFunction ());
}

Handle<Value> Builder::New (const Arguments& args) {
    HandleScope scope;

    // Check parameters
    bool preload = false;
    if (args.Length () == 1 && args[0]->IsFunction ()) {
        // var builder = new Builder (callback);
    } else if (args.Length () == 2 && args[0]->IsString ()
                                   && args[1]->IsFunction ())
    {
        // var builder = new Builder ('/path', callback);
        preload = true;
    } else {
        return THROW_BAD_ARGS;
    }

    Builder *self = new Builder ();

    std::string filename;

    if (preload) {
        // var builder = new Builder ('/path', callback);
        filename = *String::Utf8Value (args[0]);
        self->callback_ = Persistent<Function>::New (
                Local<Function>::Cast (args[1]));
    } else {
        // var builder = new Builder (callback);
        self->callback_ = Persistent<Function>::New (
                Local<Function>::Cast (args[0]));
    }

    // In GTK
    MainLoop::push_job_gui ([=] {
        GtkBuilder *obj = gtk_builder_new ();

        if (preload) {
            // TODO report error to JavaScript
            GError *error = NULL;
            int ret =
            gtk_builder_add_from_file (obj, filename.c_str (), &error);
            if (!ret) {
                fprintf (stderr, "Cannot build from file: %s\n", error->message);
            }
        }

        self->obj_ = obj;
        self->host_ = true;

        // Notify the creation
        MainLoop::push_job_node (std::bind (&Builder::after_create, self));
    });

    self->Wrap (args.This ());
    return args.This ();
}

Handle<Value> Builder::Get (const Arguments& args) {
    HandleScope scope;

    // var widget = builder.get ('window_name');
    if (args.Length () != 1 || !args[0]->IsString ())
    {
        return THROW_BAD_ARGS;
    }

    Builder *self = ObjectWrap::Unwrap<Builder> (args.This());
    GtkBuilder *obj = static_cast<GtkBuilder*> (self->obj_);

    // Gtk::Builder::get_widget, do it syncly
    gdk_threads_enter();
    GObject *widget = gtk_builder_get_object (obj,
                                              *String::Utf8Value (args[0]));
    gdk_threads_leave();

    if (widget == NULL) {
        return ThrowException(Exception::Error(
                    String::New("Widget does not exsit")));
    }

    Local<Value> external = External::New (widget);

    return scope.Close (Widget::constructor_template->
        GetFunction ()->NewInstance (1, &external));
}

void Builder::after_create () {
    HandleScope scope;

    Handle<Value> args[] = { handle_ };
    callback_->Call (handle_, 1, args);
}
} /* clip */
