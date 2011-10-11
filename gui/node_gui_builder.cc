#include <string>
#include <glib-object.h>
#include <gdk/gdk.h>
#include <gtk/gtk.h>

#include "node_gui_builder.h"
#include "impl_mainloop_gtk.h"
#include "impl_closure_gtk.hpp"

namespace clip {
Persistent<FunctionTemplate> Builder::constructor_template;

Builder::~Builder () {
    if (host_ && obj_)
        g_object_unref (obj_);
}

void Builder::Init (Handle<v8::Object> target) {
    CREATE_NODE_CONSTRUCTOR_INHERIT ("Builder", Builder, Object);

    DEFINE_NODE_METHOD ("get", Get);

    END_CONSTRUCTOR ();
}

// var builder = new Builder ('/path', callback);
Handle<Value> Builder::New (const Arguments& args) {
    HandleScope scope;

    // Check parameters
    if (!(args.Length () == 2 && args[0]->IsString () && args[1]->IsFunction ())) {
        return THROW_BAD_ARGS;
    }

    Builder *self = new Builder ();

    std::string filename = *String::Utf8Value (args[0]);
    Persistent<Function> callback = Persistent<Function>::New (
            Local<Function>::Cast (args[1]));

    // In GTK
    MainLoop::push_job_gui ([=] () mutable {
        GtkBuilder *obj = gtk_builder_new ();

        gtk_builder_add_from_file (obj, filename.c_str (), NULL);

        self->obj_ = obj;
        self->host_ = true;

        // Notify the creation
        MainLoop::push_job_node ([=] () mutable {
            Handle<Value> args[] = { self->handle_ };

            callback->Call (self->handle_, 1, args);
            callback.Dispose ();
        });
    });

    self->Wrap (args.This ());
    return args.This ();
}

Handle<Value> Builder::Get (const Arguments& args) {
    HandleScope scope;

    // var widget = builder.get ('window_name', Widget);
    if (!(args.Length () == 2 && args[0]->IsString ()
                              && args[1]->IsFunction ()) &&
        !(args.Length () == 1 && args[0]->IsString ()))
    {
        return THROW_BAD_ARGS;
    }

    Builder *self = ObjectWrap::Unwrap<Builder> (args.This());
    GtkBuilder *obj = static_cast<GtkBuilder*> (self->obj_);

    // Gtk::Builder::get_widget, do it synchorously
    gdk_threads_enter();
    GObject *widget = 
        gtk_builder_get_object (obj, *String::Utf8Value (args[0]));
    gdk_threads_leave();

    // Check whether widget exists
    if (widget == NULL) {
        return ThrowException(Exception::Error(
                    String::New("Widget does not exsit")));
    }

    // Stroe pointer for object constructor
    Local<Value> external = External::New (widget);

    if (args.Length () == 1) {
        // Create GtkObject by default
        return scope.Close (Object::constructor_template->GetFunction ()->
                NewInstance (1, &external));
    } else {
        // Create instance by argument's constructor
        return scope.Close (Local<Function>::Cast (args[1])->
                NewInstance (1, &external));
    }
}
} /* clip */
