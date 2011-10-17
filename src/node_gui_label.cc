#include "node_gui_label.h"

namespace clip {
Persistent<FunctionTemplate> Label::constructor_template;

void Label::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Label", Label, Misc, image);

    GETTER_METHOD (Label , "getText"               , gtk_label_get_text                 , const gchar* ) ;
    SETTER_METHOD (Label , "setText"               , gtk_label_set_text                 , const gchar* ) ;
    SETTER_METHOD (Label , "setMarkup"             , gtk_label_set_markup               , const gchar* ) ;
    SETTER_METHOD (Label , "setMarkupWithMnemonic" , gtk_label_set_markup_with_mnemonic , const gchar* ) ;
    SETTER_METHOD (Label , "setPattern"            , gtk_label_set_pattern              , const gchar* ) ;
    SETTER_METHOD (Label , "setWidthChars"         , gtk_label_set_width_chars          , gint         ) ;
    GETTER_METHOD (Label , "getWidthChars"         , gtk_label_get_width_chars          , gint         ) ;
    SETTER_METHOD (Label , "setMaxWidthChars"      , gtk_label_set_max_width_chars      , gint         ) ;
    GETTER_METHOD (Label , "getMaxWidthChars"      , gtk_label_get_max_width_chars      , gint         ) ;
    SETTER_METHOD (Label , "setLineWrap"           , gtk_label_set_line_wrap            , gboolean     ) ;
    GETTER_METHOD (Label , "getLineWrap"           , gtk_label_get_line_wrap            , gboolean     ) ;
    GETTER_METHOD (Label , "getMnemonicKeyval"     , gtk_label_get_mnemonic_keyval      , guint        ) ;
    GETTER_METHOD (Label , "getSelectable"         , gtk_label_get_selectable           , gboolean     ) ;
    GETTER_METHOD (Label , "getMnemonicWidget"     , gtk_label_get_mnemonic_widget      , GtkWidget*   ) ;
    SETTER_METHOD (Label , "setMnemonicWidget"     , gtk_label_set_mnemonic_widget      , GtkWidget*   ) ;
    SETTER_METHOD (Label , "setSelectable"         , gtk_label_set_selectable           , gboolean     ) ;
    SETTER_METHOD (Label , "setTextWithMnemonic"   , gtk_label_set_text_with_mnemonic   , const gchar* ) ;
    GETTER_METHOD (Label , "getLabel"              , gtk_label_get_label                , const gchar* ) ;
    SETTER_METHOD (Label , "setLabel"              , gtk_label_set_label                , const gchar* ) ;
    GETTER_METHOD (Label , "getUseMarkup"          , gtk_label_get_use_markup           , gboolean     ) ;
    SETTER_METHOD (Label , "setUseMarkup"          , gtk_label_set_use_markup           , gboolean     ) ;
    GETTER_METHOD (Label , "getUseUnderline"       , gtk_label_get_use_underline        , gboolean     ) ;
    SETTER_METHOD (Label , "setUseUnderline"       , gtk_label_set_use_underline        , gboolean     ) ;
    GETTER_METHOD (Label , "getSingleLineMode"     , gtk_label_get_single_line_mode     , gboolean     ) ;
    SETTER_METHOD (Label , "setSingleLineMode"     , gtk_label_set_single_line_mode     , gboolean     ) ;
    GETTER_METHOD (Label , "getAngle"              , gtk_label_get_angle                , gdouble      ) ;
    SETTER_METHOD (Label , "setAngle"              , gtk_label_set_angle                , gdouble      ) ;
    GETTER_METHOD (Label , "getCurrentUri"         , gtk_label_get_current_uri          , const gchar* ) ;
    GETTER_METHOD (Label , "getTrackVisitedLinks"  , gtk_label_get_track_visited_links  , gboolean     ) ;
    SETTER_METHOD (Label , "setTrackVisitedLinks"  , gtk_label_set_track_visited_links  , gboolean     ) ;

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "selectRegion", (SetterMethod<gint, gint, GtkLabel, gtk_label_select_region>));

    END_CONSTRUCTOR ();
}
} /* clip */
