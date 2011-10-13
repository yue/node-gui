#ifndef NODE_GUI_OBJECT_H
#define NODE_GUI_OBJECT_H

#include <list>
#include <vector>
#include <string>

#include <gtk/gtk.h>

#include "node_gui.h"
#include "impl_value_gtk.h"
#include "impl_mainloop_gtk.h"

namespace clip {
using namespace node;
using namespace v8;

class Object: public ObjectWrap {
DECLARE_NODE_OBJECT (Object);

public:
    Object ();
    Object (void *external);
    virtual ~Object ();

protected:
    DEFINE_CPP_METHOD (New);
    DEFINE_CPP_METHOD (On);
    DEFINE_CPP_METHOD (GetProperty);
    DEFINE_CPP_METHOD (SetProperty);

    // Define generic constructor
    template<class Type, GType get_type (void)>
    static Handle<Value> NewMethod (const Arguments& args) {
        HandleScope scope;

        WRAP_EXSISTING_OBJECT (Type);

        if (args.Length () % 2 != 0)
            return THROW_BAD_ARGS;

        void *widget;

        if (args.Length () == 0) {
            gdk_threads_enter();
            widget = g_object_new (get_type (), NULL);
            gdk_threads_leave();
        } else {
            // Keep strings in this list, so we create parameters the
            // raw string stays valid.
            std::list<std::string> tmp_store;
            std::vector<GParameter> parameters (args.Length () / 2);

            // Push parameters
            for (int i = 0; i < args.Length (); i += 2) {
                tmp_store.push_back (*String::Utf8Value (args[0]));

                parameters[i/2].name = tmp_store.back ().c_str ();
                parameters[i/2].value = glue (args[i + 1]);
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
        Type *self = new Type ();
        self->obj_  = widget;
        self->host_ = true;

        self->Wrap (args.This ());
        self->Ref ();
        return args.This ();
    }

    // Define methods without any arguments.
    // Example: from 'gtk_widget_show_all' to 'show'
    template<class Type, class GtkType, void function (GtkType*)>
    static Handle<Value> SetterMethod (const Arguments& args) {
        HandleScope scope;

        Type *self = ObjectWrap::Unwrap<Type> (args.This());
        GtkType *obj = static_cast<GtkType*> (self->obj_);

        MainLoop::push_job_gui ([=] {
            function (obj);
        });

        return Undefined ();
    }

    // Define setter methods
    // Convert from 'gtk_status_icon_set_name (name)' to 'set_name (name)'
    template<class ARG0,
             class Type, class GtkType, void function (GtkType*, ARG0)>
    static Handle<Value> SetterMethod (const Arguments& args) {
        HandleScope scope;

        if (args.Length () != 1)
            return THROW_BAD_ARGS;

        Type *self = ObjectWrap::Unwrap<Type> (args.This());
        GtkType *obj = static_cast<GtkType*> (self->obj_);

        GValue value = glue (args[0]);

        MainLoop::push_job_gui ([=] () mutable {
            function (obj, raw<ARG0> (&value));
            g_value_unset (&value);
        });

        return Undefined ();
    }

    // Define getter methods
    // Convert from 'gtk_status_icon_get_stock ()' to 'get_name ()'
    template<class ReturnType,
             class Type, class GtkType, ReturnType function (GtkType*)>
    static Handle<Value> GetterMethod (const Arguments& args) {
        HandleScope scope;

        if (args.Length () != 1)
            return THROW_BAD_ARGS;

        Type *self = ObjectWrap::Unwrap<Type> (args.This());
        GtkType *obj = static_cast<GtkType*> (self->obj_);

        ReturnType result = function (obj);

        return scope.Close (glue (result));
    }

protected:
    void *obj_; // Raw GTK+ object pointer
    bool host_; // Whether we should manage its life

    static void signal_marshal (GClosure *closure,
                                GValue *return_value,
                                guint n_param_values,
                                const GValue *param_values,
                                gpointer invocation_hint,
                                gpointer marshal_data);
};

DECLARE_GLUE (Object);
} /* clip */

#endif /* end of NODE_GUI_OBJECT_H */
