#include <gtk/gtk.h>
#include "node_gui_status_icon.h"

namespace clip {
Persistent<FunctionTemplate> StatusIcon::constructor_template;
    
void StatusIcon::Init (Handle<v8::Object> target) {
    CREATE_NODE_CONSTRUCTOR_INHERIT ("StatusIcon", StatusIcon, Object);

	SETTER_METHOD (StatusIcon , "set_from_file"      , gtk_status_icon_set_from_file      , const gchar*) ;
	SETTER_METHOD (StatusIcon , "set_from_icon_name" , gtk_status_icon_set_from_icon_name , const gchar*) ;
	SETTER_METHOD (StatusIcon , "set_from_stock"     , gtk_status_icon_set_from_stock     , const gchar*) ;
	GETTER_METHOD (StatusIcon , "get_stock"          , gtk_status_icon_get_stock          , const gchar*) ;
	GETTER_METHOD (StatusIcon , "get_icon_name"      , gtk_status_icon_get_icon_name      , const gchar*) ;
	GETTER_METHOD (StatusIcon , "get_size"           , gtk_status_icon_get_size           , int         ) ;
	SETTER_METHOD (StatusIcon , "set_tooltip"        , gtk_status_icon_set_tooltip        , const gchar*) ;
	SETTER_METHOD (StatusIcon , "set_tooltip_text"   , gtk_status_icon_set_tooltip_text   , const gchar*) ;
	GETTER_METHOD (StatusIcon , "get_tooltip_text"   , gtk_status_icon_get_tooltip_text   , gchar*      ) ;
	SETTER_METHOD (StatusIcon , "set_tooltip_markup" , gtk_status_icon_set_tooltip_markup , const gchar*) ;
	GETTER_METHOD (StatusIcon , "get_tooltip_markup" , gtk_status_icon_get_tooltip_markup , gchar*      ) ;
	SETTER_METHOD (StatusIcon , "set_has_tooltip"    , gtk_status_icon_set_has_tooltip    , gboolean    ) ;
	GETTER_METHOD (StatusIcon , "get_has_tooltip"    , gtk_status_icon_get_has_tooltip    , int         ) ;
	SETTER_METHOD (StatusIcon , "set_title"          , gtk_status_icon_set_title          , const gchar*) ;
	GETTER_METHOD (StatusIcon , "get_title"          , gtk_status_icon_get_title          , const gchar*) ;
	SETTER_METHOD (StatusIcon , "set_name"           , gtk_status_icon_set_name           , const gchar*) ;
	SETTER_METHOD (StatusIcon , "set_visible"        , gtk_status_icon_set_visible        , gboolean    ) ;
	GETTER_METHOD (StatusIcon , "get_visible"        , gtk_status_icon_get_visible        , gboolean    ) ;
	SETTER_METHOD (StatusIcon , "set_blinking"       , gtk_status_icon_set_blinking       , gboolean    ) ;
	GETTER_METHOD (StatusIcon , "get_blinking"       , gtk_status_icon_get_blinking       , gboolean    ) ;
	GETTER_METHOD (StatusIcon , "is_embedded"        , gtk_status_icon_is_embedded        , gboolean    ) ;

    END_CONSTRUCTOR ();
}
} /* clip */
