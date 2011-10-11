#ifndef IMPL_VALUE_GTK_H
#define IMPL_VALUE_GTK_H

#include <node.h>
#include <glib-object.h>

namespace clip {
// Generic v8::Value to GValue
GValue&& glue (v8::Handle<v8::Value> value);

// Generic GValue to v8::Value
v8::Handle<v8::Value> glue (const GValue* value);

// Convert GValue to its raw state
template<class T>
T raw (const GValue* value);

template<>
inline const gchar *raw (const GValue* value) {
	return g_value_get_string (value);
}

template<>
inline int raw (const GValue* value) {
	return g_value_get_int (value);
}

template<>
inline bool raw (const GValue* value) {
	return g_value_get_boolean (value);
}
} /* clip */

#endif /* end of IMPL_VALUE_GTK_H */
