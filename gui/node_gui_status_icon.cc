#include <gtk/gtk.h>
#include "node_gui_status_icon.h"

namespace clip {
Persistent<FunctionTemplate> StatusIcon::constructor_template;
    
void StatusIcon::Init (Handle<v8::Object> target) {
    CREATE_NODE_CONSTRUCTOR_INHERIT ("StatusIcon", StatusIcon, Object);

    SETTER_METHOD (StatusIcon , const gchar* , "set_from_file"      , gtk_status_icon_set_from_file);
    SETTER_METHOD (StatusIcon , const gchar* , "set_from_icon_name" , gtk_status_icon_set_from_icon_name);
    SETTER_METHOD (StatusIcon , const gchar* , "set_from_stock"     , gtk_status_icon_set_from_stock);
    SETTER_METHOD (StatusIcon , const gchar* , "set_tooltip"        , gtk_status_icon_set_tooltip);
    SETTER_METHOD (StatusIcon , const gchar* , "set_tooltip_text"   , gtk_status_icon_set_tooltip_text);
    SETTER_METHOD (StatusIcon , const gchar* , "set_tooltip_markup" , gtk_status_icon_set_tooltip_markup);
    SETTER_METHOD (StatusIcon , gboolean     , "set_has_tooltip"    , gtk_status_icon_set_has_tooltip);
    SETTER_METHOD (StatusIcon , const gchar* , "set_title"          , gtk_status_icon_set_title);
    SETTER_METHOD (StatusIcon , const gchar* , "set_name"           , gtk_status_icon_set_name);
    SETTER_METHOD (StatusIcon , gboolean     , "set_visible"        , gtk_status_icon_set_visible);
    SETTER_METHOD (StatusIcon , gboolean     , "set_blinking"       , gtk_status_icon_set_blinking);

    END_CONSTRUCTOR ();
}
} /* clip */
