#ifndef NODE_GUI_OBJECT_H
#define NODE_GUI_OBJECT_H

#include <vector>
#include <string>

#include <gtk/gtk.h>

#include "node_gui.h"
#include "impl_glue_gtk.h"
#include "impl_mainloop_gtk.h"

namespace clip {
using namespace node;
using namespace v8;

class Object {
DECLARE_NODE_OBJECT (Object);

protected:
    DEFINE_CPP_METHOD (New);
    DEFINE_CPP_METHOD (On);
    DEFINE_CPP_METHOD (GetProperty);

    // Define generic constructor
    template<class Type, GType get_type (void)>
    static Handle<Value> NewMethod (const Arguments& args) {
        HandleScope scope;

        WRAP_EXSISTING_OBJECT (Type);

        if (!((args.Length () == 0) ||
              (args.Length () == 1 && args[0]->IsObject ())))
            return THROW_BAD_ARGS;

        void *widget;

        if (args.Length () == 0) {
            // Just null new
            gdk_threads_enter();
            widget = g_object_new (get_type (), NULL);
            gdk_threads_leave();
        } else {
            // Get the parameters object
            Local<v8::Object> params = Local<v8::Object>::Cast (args[0]);

            // Receive arguments from object
            Local<Array> names = params->GetPropertyNames ();

            // Keep strings in this list, so when we create parameters the
            // raw string stays valid.
            std::vector<std::string> tmp_store;
            tmp_store.reserve (names->Length ());
            std::vector<GParameter> parameters (names->Length ());

            // Push parameters
            for (size_t i = 0; i < names->Length (); ++i) {
                tmp_store.push_back (*String::Utf8Value (names->Get (i)));

                parameters[i].name = tmp_store.back ().c_str ();
                parameters[i].value = glue (params->Get (names->Get (i)));
            }

            // Create object
            gdk_threads_enter();
            widget = g_object_newv (get_type (), parameters.size (), parameters.data ());
            gdk_threads_leave();

            // Clean parameters
            for (auto it = parameters.begin (); it != parameters.end (); ++it) {
                g_value_unset (&it->value);
            }
        }

        if (widget == NULL)
            return NODE_ERROR ("Cannot create object");

        // Wrap it
        args.This ()->SetPointerInInternalField (0, widget);

        return args.This ();
    }

    // Define methods without any arguments.
    // Example: from 'gtk_widget_show_all' to 'show'
    template<class GtkType, void function (GtkType*)>
    static Handle<Value> SetterMethod (const Arguments& args) {
        HandleScope scope;

        GtkType *obj = glue<GtkType> (args.This ());

        MainLoop::push_job_gui ([=] {
            function (obj);
        });

        return Undefined ();
    }

    // Define setter methods
    // Convert from 'gtk_status_icon_set_name (name)' to 'set_name (name)'
    template<class ARG0,
             class GtkType, void function (GtkType*, ARG0)>
    static Handle<Value> SetterMethod (const Arguments& args) {
        HandleScope scope;

        if (args.Length () != 1)
            return THROW_BAD_ARGS;

        GtkType *obj = glue<GtkType> (args.This ());

        GValue value = glue (args[0]);

        MainLoop::push_job_gui ([=] () mutable {
            function (obj, raw<ARG0> (&value));
            g_value_unset (&value);
        });

        return Undefined ();
    }

    // Define setter methods
    template<class ARG0, class ARG1,
             class GtkType, void function (GtkType*, ARG0, ARG1)>
    static Handle<Value> SetterMethod (const Arguments& args) {
        HandleScope scope;

        if (args.Length () != 2)
            return THROW_BAD_ARGS;

        GtkType *obj = glue<GtkType> (args.This ());

        GValue arg0 = glue (args[0]);
        GValue arg1 = glue (args[1]);

        MainLoop::push_job_gui ([=] () mutable {
            function (obj, raw<ARG0> (&arg0), raw<ARG1> (&arg1));
            g_value_unset (&arg0);
            g_value_unset (&arg1);
        });

        return Undefined ();
    }

    // Define getter methods
    // Convert from 'gtk_status_icon_get_stock ()' to 'get_name ()'
    template<class ReturnType,
             class GtkType, ReturnType function (GtkType*)>
    static Handle<Value> GetterMethod (const Arguments& args) {
        HandleScope scope;

        GtkType *obj = glue<GtkType> (args.This ());

        ReturnType result = function (obj);

        return scope.Close (glue (result));
    }

    template<class ReturnType, class ARG0,
             class GtkType, ReturnType function (GtkType*, ARG0)>
    static Handle<Value> GetterMethod (const Arguments& args) {
        HandleScope scope;

        if (args.Length () != 1)
            return THROW_BAD_ARGS;

        GtkType *obj = glue<GtkType> (args.This ());

        GValue arg0 = glue (args[0]);

        ReturnType result = function (obj, raw<ARG0> (&arg0));

        g_value_unset (&arg0);

        return scope.Close (glue (result));
    }

    template<class ReturnType, class ARG0, class ARG1,
             class GtkType, ReturnType function (GtkType*, ARG0, ARG1)>
    static Handle<Value> GetterMethod (const Arguments& args) {
        HandleScope scope;

        if (args.Length () != 2)
            return THROW_BAD_ARGS;

        GtkType *obj = glue<GtkType> (args.This ());

        GValue arg0 = glue (args[0]);
        GValue arg1 = glue (args[1]);

        ReturnType result = function (obj, raw<ARG0> (&arg0), raw<ARG1> (&arg1));

        g_value_unset (&arg0);
        g_value_unset (&arg1);

        return scope.Close (glue (result));
    }

protected:
    static void signal_marshal (GClosure *closure,
                                GValue *return_value,
                                guint n_param_values,
                                const GValue *param_values,
                                gpointer invocation_hint,
                                gpointer marshal_data);
};
} /* clip */

#endif /* end of NODE_GUI_OBJECT_H */
