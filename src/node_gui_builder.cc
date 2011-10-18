#include <string>
#include <glib-object.h>
#include <gdk/gdk.h>
#include <gtk/gtk.h>

#include "node_gui_builder.h"
#include "impl_mainloop_gtk.h"
#include "impl_closure_gtk.hpp"

namespace clip {
Persistent<FunctionTemplate> Builder::constructor_template;

void Builder::Init (Handle<v8::Object> target) {
    ATTACH_CONSTRUCTOR("Builder", Builder, New);
    ATTACH_INHERITANCE(Object);

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

    std::string filename = *String::Utf8Value (args[0]);
    auto callback = Persistent<Function>::New (Local<Function>::Cast (args[1]));
    auto self = Persistent<v8::Object>::New (args.This ());

    // In GTK
    MainLoop::push_job_gui ([=] () mutable {
        GtkBuilder *obj = gtk_builder_new ();

        gtk_builder_add_from_file (obj, filename.c_str (), NULL);

        // Notify the creation
        MainLoop::push_job_node ([=] () mutable {
            // Store the builder
            self->SetPointerInInternalField (0, obj);
            self->SetPointerInInternalField (1, nullptr);

            // Callback
            Handle<Value> args[] = { self };
            callback->Call (self, 1, args);

            // Free them
            callback.Dispose ();
            self.Dispose ();
        });
    });

    args.This ()->SetPointerInInternalField (0, nullptr);
    args.This ()->SetPointerInInternalField (1, nullptr);
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

    GtkBuilder *obj = glue<GtkBuilder> (args.This ());

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

    if (args.Length () == 1) {
        // Create GObject by default
        return scope.Close (glue<Object> (widget));
    } else {
        v8::Local<v8::Value> external = v8::External::New (widget);

        // Create instance by argument's constructor
        return scope.Close (Local<Function>::Cast (args[1])->
                NewInstance (1, &external));
    }
}
} /* clip */
