#include <string>

#include <gdk/gdk.h>

#include "node_gui_object.h"
#include "impl_mainloop_gtk.h"
#include "impl_closure_gtk.hpp"

namespace clip {
Persistent<FunctionTemplate> Object::constructor_template;

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
    CREATE_NODE_CONSTRUCTOR ("Object", Object);

    DEFINE_NODE_METHOD ("on", On);
    DEFINE_NODE_METHOD ("getProperty", GetProperty);
    DEFINE_NODE_METHOD ("setProperty", SetProperty);

    END_CONSTRUCTOR ();
}

Handle<Value> Object::New (const Arguments& args) {
    HandleScope scope;

    WRAP_EXSISTING_OBJECT (Object);

    return ThrowException(Exception::TypeError(String::New(
                    "Object is not allow to be manually created")));
}

Handle<Value> Object::SetProperty (const Arguments& args) {
    HandleScope scope;

    if (args.Length () != 2)
        return THROW_BAD_ARGS;

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

Handle<Value> Object::GetProperty (const Arguments& args) {
    HandleScope scope;

    if (args.Length () != 1)
        return THROW_BAD_ARGS;

    Object *self = ObjectWrap::Unwrap<Object> (args.This());
    GObject *obj = static_cast<GObject*> (self->obj_);

    GValue key = glue (args[0]);

    // Work out property's type
    GValue value = { 0 };
    GParamSpec *spec = g_object_class_find_property (
            G_OBJECT_GET_CLASS (obj), g_value_get_string (&key));

    // Guard against invalid property
    if (spec == NULL) {
        g_value_unset (&key);
        return NODE_ERROR ("Invalid property name"); 
    }

    // Init type from property's type
    g_value_init (&value, G_PARAM_SPEC_VALUE_TYPE (spec));

    // Get it
    g_object_get_property (obj, g_value_get_string (&key), &value);
    Handle<Value> result = glue (&value);

    // And remember to release it
    g_value_unset (&key);
    g_value_unset (&value);

    return result;
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

    // Create closure
    GClosure *closure = NodeClosure::create (args[1]);

    MainLoop::push_job_gui ([=] {
        // Connect
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
        ((NodeClosure*) closure)->callback->Call (
            Context::GetCurrent ()->Global (), args.size (), args.data ());
    });
}
} /* clip */
