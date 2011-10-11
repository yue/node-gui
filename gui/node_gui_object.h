#ifndef NODE_GUI_OBJECT_H
#define NODE_GUI_OBJECT_H

#include <glib-object.h>

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

    // Define methods without any arguments.
    // Example: from 'gtk_widget_show_all' to 'show'
    template<class Type, class GtkType, void function (GtkType*)>
    static Handle<Value> SimpleMethod (const Arguments& args) {
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
    template<class T,
             class Type,
             class GtkType,
             void function (GtkType*, T)>
    static Handle<Value> SetterMethod (const Arguments& args) {
        HandleScope scope;

        if (args.Length () != 1)
            return THROW_BAD_ARGS;

        Type *self = ObjectWrap::Unwrap<Type> (args.This());
        GtkType *obj = static_cast<GtkType*> (self->obj_);

        GValue value = glue (args[0]);

        MainLoop::push_job_gui ([=] () mutable {
            function (obj, raw<T> (&value));
            g_value_unset (&value);
        });

        return Undefined ();
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
} /* clip */

#endif /* end of NODE_GUI_OBJECT_H */
