#ifndef IMPL_VALUE_GTK_H
#define IMPL_VALUE_GTK_H

#include <iosfwd>

#include <glib-object.h>
#include <node.h>

#include "node_gui_object.h"

namespace clip {
// Generic v8::Value to GValue
GValue&& glue (v8::Handle<Value> value) {
    GValue a = { 0 };

    if (value->IsUndefined ()) {
        g_value_init (&a, G_TYPE_NONE);
    } else if (value->IsNull ()) {
        g_value_init (&a, G_TYPE_NONE);
    } else if (value->IsString ()) {
        g_value_init (&a, G_TYPE_STRING);
        g_value_set_string (&a, *String::Utf8Value (value));
    } else if (value->IsBoolean ()) {
        g_value_init (&a, G_TYPE_BOOLEAN);
        g_value_set_boolean (&a, value->BooleanValue ());
    } else if (value->IsNumber ()) {
        g_value_init (&a, G_TYPE_DOUBLE);
        g_value_set_boolean (&a, value->NumberValue ());
    } else if (value->IsExternal ()) {
        // External holds glib object
        g_value_init (&a, G_TYPE_OBJECT);
        g_value_set_object (&a, v8::External::Unwrap (value));
    } else if (value->IsInt32 ()) {
        g_value_init (&a, G_TYPE_INT);
        g_value_set_int (&a, value->Int32Value ());
    } else if (value->IsUint32 ()) {
        g_value_init (&a, G_TYPE_UINT);
        g_value_set_uint (&a, value->Uint32Value ());
    } else {
        g_value_init (&a, G_TYPE_INVALID);
    }

    return std::move (a);
}

// Generic GValue to v8::Value
v8::Handle<Value> glue (const GValue* value) {
    if (value == NULL)
        return Undefined ();

    switch (G_TYPE_FUNDAMENTAL(G_VALUE_TYPE(value))) {
        case G_TYPE_INVALID:
        case G_TYPE_NONE:
            return Undefined ();

        case G_TYPE_BOOLEAN:
            return Boolean::New (g_value_get_boolean (value));

        case G_TYPE_INT:
            return Integer::New (g_value_get_int (value));

        case G_TYPE_LONG:
            return Number::New (g_value_get_long (value));

        case G_TYPE_UINT:
            return Integer::NewFromUnsigned (g_value_get_uint (value));

        case G_TYPE_ULONG:
            return Integer::NewFromUnsigned (g_value_get_ulong (value));

        case G_TYPE_FLOAT:
            return Number::New (g_value_get_float (value));

        case G_TYPE_ENUM:
            return Integer::New (g_value_get_enum (value));

        case G_TYPE_FLAGS:
            return Integer::New (g_value_get_flags (value));

        case G_TYPE_STRING:
            return String::New (g_value_get_string (value));

        default:
            return ThrowException(Exception::TypeError(
                        String::New("Cannot find equivanent type")));
    }
}
} /* clip */

#endif /* end of IMPL_VALUE_GTK_H */
