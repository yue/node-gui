#include <string>

#include <glib-object.h>
#include <gdk/gdk.h>

#include "node_gui_object.h"
#include "impl_value_gtk.hpp"
#include "impl_mainloop_gtk.h"

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))

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
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    constructor_template = Persistent<FunctionTemplate>::New(t);
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);
    constructor_template->SetClassName(String::NewSymbol("Object"));

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "setProperty",
                               SetProperty);
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "getProperty",
                               GetProperty);
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "on", On);
    target->Set (String::NewSymbol ("Object"), t->GetFunction ());
}

Handle<Value> Object::New (const Arguments& args) {
    HandleScope scope;

    // Should never mannualy create a object
    return ThrowException(Exception::TypeError(String::New(
                    "Object is not allow to be manually created")));
}

Handle<Value> Object::SetProperty (const Arguments& args) {
    HandleScope scope;

    if (args.Length () == 2 && args[0]->IsString ())
    {
        Object *self = ObjectWrap::Unwrap<Object> (args.This());
        GObject *obj = static_cast<GObject*> (self->obj_);

        std::string key = *String::Utf8Value (args[0]);
        std::string value = *String::Utf8Value (args[1]);
        MainLoop::push_job_gui ([=] {
            GValue a = value_init (value);
            g_object_set_property (obj, key.c_str (), &a);
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

        std::string key = *String::Utf8Value (args[0]);
        Local<String> value = String::New ("");

        gdk_threads_enter();
        GValue a = value_init<std::string> ();
        g_object_get_property (obj, key.c_str (), &a);
        const char * str = g_value_get_string (&a);
        if (str)
            value = String::New (str);
        g_value_unset (&a);
        gdk_threads_leave();

        return scope.Close (value);
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

    return Undefined ();
}
} /* clip */
