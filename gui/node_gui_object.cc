#include <string>
#include <vector>

#include <gdk/gdk.h>

#include "node_gui.h"
#include "node_gui_object.h"
#include "impl_value_gtk.hpp"
#include "impl_mainloop_gtk.h"

namespace clip {
Persistent<FunctionTemplate> Object::constructor_template;

struct NodeClosure {
    GClosure closure;
    Persistent<Function> callback;
};

// Stub for future setting
Object::Object () :
    obj_ (nullptr),
    host_ (false)
{
}

// Init from existing object
Object::Object (void *external) :
    obj_ (external),
    host_ (false)
{
}

Object::~Object () {
}

void Object::Init (Handle<v8::Object> target) {
    HandleScope scope;

    CREATE_NODE_CONSTRUCTOR ("Object");

    DEFINE_NODE_METHOD ("setProperty" , SetProperty);
    DEFINE_NODE_METHOD ("getProperty" , GetProperty);
    DEFINE_NODE_METHOD ("on"          , On);

    target->Set (String::NewSymbol ("Object"), t->GetFunction ());
}

Handle<Value> Object::NewInstance (void *obj) {
    HandleScope scope;

    Handle<Value> arg = External::New (obj);
    return scope.Close (
            constructor_template->GetFunction ()->NewInstance (1, &arg));
}

Handle<Value> Object::New (const Arguments& args) {
    HandleScope scope;

    // Should never mannualy create a object
    return ThrowException(Exception::TypeError(String::New(
                    "Object is not allow to be manually created")));
}

Handle<Value> Object::SetProperty (const Arguments& args) {
    HandleScope scope;

    if (args.Length () == 2)
    {
        Object *self = ObjectWrap::Unwrap<Object> (args.This());
        GObject *obj = static_cast<GObject*> (self->obj_);

        // They will be 'moved' to the lambda below
        GValue key   = glue (args[0]);
        GValue value = glue (args[1]);

        MainLoop::push_job_gui ([=] () mutable {
            g_object_set_property (obj, g_value_get_string (&key), &value);
            g_value_unset (&key);
            g_value_unset (&value);
        });

        return Undefined ();
    }

    return THROW_BAD_ARGS;
}

Handle<Value> Object::GetProperty (const Arguments& args) {
    HandleScope scope;

    if (args.Length () == 1 && args[0]->IsString ())
    {
        Object *self = ObjectWrap::Unwrap<Object> (args.This());
        GObject *obj = static_cast<GObject*> (self->obj_);

        GValue key = glue (args[0]);

        // Work out property's type
        GValue value = { 0 };
        GParamSpec *spec = g_object_class_find_property (
                G_OBJECT_GET_CLASS (obj), g_value_get_string (&key));
        g_value_init (&value, G_PARAM_SPEC_VALUE_TYPE (spec));

        // Get it
        g_object_get_property (obj, g_value_get_string (&key), &value);
        Handle<Value> result = glue (&value);

        // And remember to release it
        g_value_unset (&key);
        g_value_unset (&value);

        return scope.Close (result);
    }

    return THROW_BAD_ARGS;
}

Handle<Value> Object::On (const Arguments& args) {
    HandleScope scope;

    if (!args.Length () == 2 ||
        !args[0]->IsString () ||
        !args[1]->IsFunction ())
    {
        return THROW_BAD_ARGS;
    }

    Object *self = ObjectWrap::Unwrap<Object> (args.This());
    GObject *obj = static_cast<GObject*> (self->obj_);

    // Signal name
    GValue signal = glue (args[0]);

    // Save callback
    GClosure *closure = g_closure_new_simple (sizeof (NodeClosure), self);
    ((NodeClosure*) closure)->callback = 
            Persistent<Function>::New (Local<Function>::Cast (args[1]));

    MainLoop::push_job_gui ([=] {
        // Connect
        g_closure_add_invalidate_notifier (closure, NULL, closure_invalidate);
        g_closure_set_marshal (closure, signal_marshal);
        g_signal_connect_closure (obj, g_value_get_string (&signal),
                                  closure, true);
    });

    return Undefined ();
}

void Object::signal_marshal (GClosure *closure,
                             GValue *return_value,
                             guint n_param_values,
                             const GValue *param_values,
                             gpointer invocation_hint,
                             gpointer marshal_data)
{
    std::vector < Handle<Value> > args;
    args.reserve (n_param_values - 1);

    // Convert arguments
    for (int i = 0; i < (int) n_param_values - 1 - 1; i++) {
        args.push_back (glue (param_values + i));
    }

    // Call it
    MainLoop::push_job_node ([=] () mutable {
        HandleScope scope;

        ((NodeClosure*) closure)->callback->Call (
            Context::GetCurrent ()->Global (), args.size (), args.data ());
    });
}

void Object::closure_invalidate (gpointer data, GClosure *closure) {
    v8::Locker locker;
    ((NodeClosure*) closure)->callback.Dispose ();
}
} /* clip */
