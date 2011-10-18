#include "node_gui_text_view.h"

namespace clip {
Persistent<FunctionTemplate> TextView::constructor_template;

void TextView::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("TextView", TextView, Container, text_view);

    GETTER_METHOD (TextView , "getBuffer" , gtk_text_view_get_buffer, GtkTextBuffer *) ;
    SETTER_METHOD (TextView , "setBuffer" , gtk_text_view_set_buffer, GtkTextBuffer *) ;

    END_CONSTRUCTOR ();
}
} /* clip */
