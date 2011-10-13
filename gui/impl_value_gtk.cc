#include <stdio.h>
#include "node_gui_object.h"
#include "impl_value_gtk.h"

namespace clip {
GValue&& glue (v8::Handle<v8::Value> value) {
    GValue a = { 0 };

    if (value->IsUndefined () || value->IsNull ()) {
        g_value_init (&a, G_TYPE_POINTER);
        g_value_set_pointer (&a, NULL);
    } else if (value->IsString ()) {
        g_value_init (&a, G_TYPE_STRING);
        g_value_set_string (&a, *String::Utf8Value (value));
    } else if (value->IsExternal ()) {
        g_value_init (&a, G_TYPE_POINTER);
        g_value_set_pointer (&a, v8::External::Unwrap (value));
    } else if (value->IsInt32 ()) {
        g_value_init (&a, G_TYPE_INT);
        g_value_set_int (&a, value->Int32Value ());
    } else if (value->IsUint32 ()) {
        g_value_init (&a, G_TYPE_UINT);
        g_value_set_uint (&a, value->Uint32Value ());
    } else if (value->IsBoolean ()) {
        g_value_init (&a, G_TYPE_BOOLEAN);
        g_value_set_boolean (&a, value->BooleanValue ());
    } else if (value->IsNumber ()) {
        g_value_init (&a, G_TYPE_DOUBLE);
        g_value_set_double (&a, value->NumberValue ());
    } else if (value->IsObject ()) {
        // Have passed a ObjectWrap'ed GtkObject
        Handle<v8::Object> tmp = Handle<v8::Object>::Cast (value); 

        // It's a javascript object
        if (tmp->InternalFieldCount () != 1) {
            g_value_init (&a, G_TYPE_INVALID);
            return std::move (a);
        }

        // Dig out the GtkObject's instance
        Object *self = ObjectWrap::Unwrap<Object> (tmp);
        GObject *obj = static_cast<GObject*> (self->ptr ());

        // Pass it
        g_value_init (&a, G_TYPE_POINTER);
        g_value_set_pointer (&a, obj);
    } else {
        g_value_init (&a, G_TYPE_INVALID);
    }

    return std::move (a);
}

v8::Handle<Value> glue (const GValue* value) {
    HandleScope scope;

    if (value == NULL)
        return Undefined ();

    switch (G_TYPE_FUNDAMENTAL(G_VALUE_TYPE(value))) {
        case G_TYPE_INVALID:
        case G_TYPE_NONE:
            return Undefined ();

        case G_TYPE_BOOLEAN:
            return scope.Close (Boolean::New (g_value_get_boolean (value)));

        case G_TYPE_INT:
            return scope.Close (Integer::New (g_value_get_int (value)));

        case G_TYPE_LONG:
            return scope.Close (Number::New (g_value_get_long (value)));

        case G_TYPE_UINT:
            return scope.Close (Integer::NewFromUnsigned (g_value_get_uint (value)));

        case G_TYPE_ULONG:
            return scope.Close (Integer::NewFromUnsigned (g_value_get_ulong (value)));

        case G_TYPE_FLOAT:
            return scope.Close (Number::New (g_value_get_float (value)));

        case G_TYPE_ENUM:
            return scope.Close (Integer::New (g_value_get_enum (value)));

        case G_TYPE_FLAGS:
            return scope.Close (Integer::New (g_value_get_flags (value)));

        case G_TYPE_STRING:
            return scope.Close (String::New (g_value_get_string (value)));

		case G_TYPE_POINTER:
			return scope.Close (External::New (g_value_get_pointer (value)));

        default:
            fprintf (stderr, "%s\n", "Cannot find equivanent type");
            return ThrowException(Exception::TypeError(
                        String::New("Cannot find equivanent type")));
    }
}

template <class T>
v8::Handle<v8::Value> glue (T *widget) {
    HandleScope scope;

    Local<Value> external = External::New (widget);
    return scope.Close (Object::constructor_template->GetFunction ()->
            NewInstance (1, &external));
}
} /* clip */
