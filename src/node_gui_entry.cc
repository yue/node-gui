#include "node_gui_entry.h"

namespace clip {
Persistent<FunctionTemplate> Entry::constructor_template;

void Entry::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Entry", Entry, Widget, entry);

    SETTER_METHOD (Entry , "setText"              , gtk_entry_set_text                , const gchar*     ) ;
    GETTER_METHOD (Entry , "getText"              , gtk_entry_get_text                , const gchar*     ) ;
    SETTER_METHOD (Entry , "appendText"           , gtk_entry_append_text             , const gchar*     ) ;
    SETTER_METHOD (Entry , "prependText"          , gtk_entry_prepend_text            , const gchar*     ) ;
    SETTER_METHOD (Entry , "setPosition"          , gtk_entry_set_position            , gint             ) ;
    GETTER_METHOD (Entry , "getTextLength"        , gtk_entry_get_text_length         , guint16          ) ;
    GETTER_METHOD (Entry , "getVisibility"        , gtk_entry_get_visibility          , gboolean         ) ;
    SETTER_METHOD (Entry , "setVisibility"        , gtk_entry_set_visibility          , gboolean         ) ;
    GETTER_METHOD (Entry , "getInvisibleChar"     , gtk_entry_get_invisible_char      , gunichar         ) ;
    SETTER_METHOD (Entry , "setInvisibleChar"     , gtk_entry_set_invisible_char      , gunichar         ) ;
    SIMPLE_METHOD (Entry , "unsetInvisibleChar"   , gtk_entry_unset_invisible_char                       ) ;
    SETTER_METHOD (Entry , "setEditable"          , gtk_entry_set_editable            , gboolean         ) ;
    SETTER_METHOD (Entry , "setMaxLength"         , gtk_entry_set_max_length          , gint             ) ;
    GETTER_METHOD (Entry , "getMaxLength"         , gtk_entry_get_max_length          , gint             ) ;
    GETTER_METHOD (Entry , "getActivatesDefault"  , gtk_entry_get_activates_default   , gboolean         ) ;
    SETTER_METHOD (Entry , "setActivatesDefault"  , gtk_entry_set_activates_default   , gboolean         ) ;
    GETTER_METHOD (Entry , "getHasFrame"          , gtk_entry_get_has_frame           , gboolean         ) ;
    SETTER_METHOD (Entry , "setHasFrame"          , gtk_entry_set_has_frame           , gboolean         ) ;
    GETTER_METHOD (Entry , "getInnerBorder"       , gtk_entry_get_inner_border        , const GtkBorder* ) ;
    SETTER_METHOD (Entry , "setInnerBorder"       , gtk_entry_set_inner_border        , const GtkBorder* ) ;
    GETTER_METHOD (Entry , "getWidthChars"        , gtk_entry_get_width_chars         , gint             ) ;
    SETTER_METHOD (Entry , "setWidthChars"        , gtk_entry_set_width_chars         , gint             ) ;
    GETTER_METHOD (Entry , "getAlignment"         , gtk_entry_get_alignment           , gfloat           ) ;
    SETTER_METHOD (Entry , "setAlignment"         , gtk_entry_set_alignment           , gfloat           ) ;
    GETTER_METHOD (Entry , "getOverwriteMode"     , gtk_entry_get_overwrite_mode      , gboolean         ) ;
    SETTER_METHOD (Entry , "setOverwriteMode"     , gtk_entry_set_overwrite_mode      , gboolean         ) ;
    GETTER_METHOD (Entry , "getProgressFraction"  , gtk_entry_get_progress_fraction   , gdouble          ) ;
    SETTER_METHOD (Entry , "setProgressFraction"  , gtk_entry_set_progress_fraction   , gdouble          ) ;
    GETTER_METHOD (Entry , "getProgressPulseStep" , gtk_entry_get_progress_pulse_step , gdouble          ) ;
    SETTER_METHOD (Entry , "setProgressPulseStep" , gtk_entry_set_progress_pulse_step , gdouble          ) ;
    SIMPLE_METHOD (Entry , "progressPulse"        , gtk_entry_progress_pulse                             ) ;
    SIMPLE_METHOD (Entry , "resetImContext"       , gtk_entry_reset_im_context                           ) ;

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "selectRegion", (SetterMethod<gint, gint, GtkEntry, gtk_entry_select_region>));
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "layoutIndexToTextIndex", (GetterMethod<gint, gint, GtkEntry, gtk_entry_layout_index_to_text_index>));
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "textIndexToLayoutIndex", (GetterMethod<gint, gint, GtkEntry, gtk_entry_text_index_to_layout_index>));

    END_CONSTRUCTOR ();
}
} /* clip */
