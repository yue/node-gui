#ifndef IMPL_VALUE_GTK_H
#define IMPL_VALUE_GTK_H

#include <iosfwd>
#include <glib-object.h>

namespace clip {
template<class T>
GValue&& value_init () {
    GValue a = { 0 };
    return std::move (a);
}

template<>
GValue&& value_init<std::string> () {
    GValue a = { 0 };
    g_value_init (&a, G_TYPE_STRING);

    return std::move (a);
}

// Convert from C++ string to GValue
GValue&& value_init (const std::string& value) {
    GValue a = { 0 };
    g_value_init (&a, G_TYPE_STRING);
    g_value_set_string (&a, value.c_str ());

    return std::move (a);
}

// Convert from static string to GValue
GValue&& value_init (const char *value) {
    GValue a = { 0 };
    g_value_init (&a, G_TYPE_STRING);
    g_value_set_static_string (&a, value);

    return std::move (a);
}
} /* clip */

#endif /* end of IMPL_VALUE_GTK_H */
