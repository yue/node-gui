#include "node_gui_button.h"

namespace clip {
Persistent<FunctionTemplate> Button::constructor_template;

void Button::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Button", Button, Bin, button);

    SIMPLE_METHOD (Button , "pressed"         , gtk_button_pressed                                                ) ;
    SIMPLE_METHOD (Button , "released"        , gtk_button_released                                               ) ;
    SIMPLE_METHOD (Button , "clicked"         , gtk_button_clicked                                                ) ;
    SIMPLE_METHOD (Button , "enter"           , gtk_button_enter                                                  ) ;
    SIMPLE_METHOD (Button , "leave"           , gtk_button_leave                                                  ) ;
    GETTER_METHOD (Button , "getLabel"        , gtk_button_get_label                              , const gchar * ) ;
    SETTER_METHOD (Button , "setLabel"        , gtk_button_set_label                              , const gchar * ) ;
    GETTER_METHOD (Button , "getUseStock"     , gtk_button_get_use_stock                          , gboolean      ) ;
    SETTER_METHOD (Button , "setUseStock"     , gtk_button_set_use_stock                          , gboolean      ) ;
    GETTER_METHOD (Button , "getUseUnderline" , gtk_button_get_use_underline                      , gboolean      ) ;
    SETTER_METHOD (Button , "setUseUnderline" , gtk_button_set_use_underline                      , gboolean      ) ;
    GETTER_METHOD (Button , "getFocusOnClick" , gtk_button_get_focus_on_click                     , gboolean      ) ;
    SETTER_METHOD (Button , "setFocusOnClick" , gtk_button_set_focus_on_click                     , gboolean      ) ;
    GETTER_METHOD (Button , "getImage"        , gtk_button_get_image                              , GtkWidget*    ) ;
    SETTER_METHOD (Button , "setImage"        , gtk_button_set_image                              , GtkWidget*    ) ;

    END_CONSTRUCTOR ();
}
} /* clip */
