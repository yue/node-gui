#include "node_gui_text_buffer.h"

namespace clip {
Persistent<FunctionTemplate> TextBuffer::constructor_template;
DEFINE_GLUE (TextBuffer);

void TextBuffer::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("TextBuffer", TextBuffer, Object, text_buffer);

    SETTER_METHOD (TextBuffer, "getStartIter", gtk_text_buffer_get_start_iter, GtkTextIter *);
    SETTER_METHOD (TextBuffer, "getEndIter", gtk_text_buffer_get_end_iter, GtkTextIter *);

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "insertAtCursor", (SetterMethod<const gchar*, gint, GtkTextBuffer, gtk_text_buffer_insert_at_cursor>));

    END_CONSTRUCTOR ();
}
} /* clip */
