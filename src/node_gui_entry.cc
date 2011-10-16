#include "node_gui_entry.h"

namespace clip {
Persistent<FunctionTemplate> Entry::constructor_template;

void Entry::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Entry", Entry, Widget, entry);

    SETTER_METHOD (Entry , "setText" , gtk_entry_set_text , const gchar* ) ;
    GETTER_METHOD (Entry , "getText" , gtk_entry_get_text , const gchar* ) ;
    SETTER_METHOD (Entry , "appendText" , gtk_entry_append_text , const gchar* ) ;
    SETTER_METHOD (Entry , "prependText" , gtk_entry_prepend_text , const gchar* ) ;
    SETTER_METHOD (Entry , "setPosition" , gtk_entry_set_position , gint ) ;
    GETTER_METHOD (Entry , "getTextLength" , gtk_entry_get_text_length , guint16 ) ;
    SETTER_METHOD (Entry , "setVisibility" , gtk_entry_set_visibility , gboolean ) ;
    SETTER_METHOD (Entry , "setInvisibleChar" , gtk_entry_set_invisible_char , gunichar ) ;
    SIMPLE_METHOD (Entry , "unsetInvisibleChar" , gtk_entry_unset_invisible_char) ;

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "selectRegion", (SetterMethod<gint, gint, GtkEntry, gtk_entry_select_region>));

    END_CONSTRUCTOR ();
}
} /* clip */
