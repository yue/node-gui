#include "node_gui_window.h"

namespace clip {
Persistent<FunctionTemplate> Window::constructor_template;

void Window::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Window", Window, Widget, window);

    SETTER_METHOD (Window , "setTitle"             , gtk_window_set_title               , const gchar*) ;
    GETTER_METHOD (Window , "getTitle"             , gtk_window_get_title               , const gchar*) ;
    SETTER_METHOD (Window , "setRole"              , gtk_window_set_role                , const gchar*) ;
    SETTER_METHOD (Window , "setStartupId"         , gtk_window_set_startup_id          , const gchar*) ;
    GETTER_METHOD (Window , "getRole"              , gtk_window_get_role                , const gchar*) ;
    GETTER_METHOD (Window , "activateFocus"        , gtk_window_activate_focus          , gboolean) ;
    GETTER_METHOD (Window , "activateDefault"      , gtk_window_activate_default        , gboolean) ;
    SETTER_METHOD (Window , "setOpacity"           , gtk_window_set_opacity             , double) ;
    GETTER_METHOD (Window , "getOpacity"           , gtk_window_get_opacity             , double) ;
    SETTER_METHOD (Window , "setSkipTaskbarHint"   , gtk_window_set_skip_taskbar_hint   , gboolean) ;
    GETTER_METHOD (Window , "getSkipTaskbarHint"   , gtk_window_get_skip_taskbar_hint   , gboolean) ;
    SETTER_METHOD (Window , "setSkipPagerHint"     , gtk_window_set_skip_pager_hint     , gboolean) ;
    GETTER_METHOD (Window , "getSkipPagerHint"     , gtk_window_get_skip_pager_hint     , gboolean) ;
    SETTER_METHOD (Window , "setUrgencyHint"       , gtk_window_set_urgency_hint        , gboolean) ;
    GETTER_METHOD (Window , "getUrgencyHint"       , gtk_window_get_urgency_hint        , gboolean) ;
    SETTER_METHOD (Window , "setAcceptFocus"       , gtk_window_set_accept_focus        , gboolean) ;
    GETTER_METHOD (Window , "getAcceptFocus"       , gtk_window_get_accept_focus        , gboolean) ;
    SETTER_METHOD (Window , "setFocusOnMap"        , gtk_window_set_focus_on_map        , gboolean) ;
    GETTER_METHOD (Window , "getFocusOnMap"        , gtk_window_get_focus_on_map        , gboolean) ;
    SETTER_METHOD (Window , "setDestroyWithParent" , gtk_window_set_destroy_with_parent , gboolean) ;
    GETTER_METHOD (Window , "getDestroyWithParent" , gtk_window_get_destroy_with_parent , gboolean) ;
    SETTER_METHOD (Window , "setMnemonicsVisible"  , gtk_window_set_mnemonics_visible   , gboolean) ;
    GETTER_METHOD (Window , "getMnemonicsVisible"  , gtk_window_get_mnemonics_visible   , gboolean) ;
    SETTER_METHOD (Window , "setResizable"         , gtk_window_set_resizable           , gboolean) ;
    GETTER_METHOD (Window , "getResizable"         , gtk_window_get_resizable           , gboolean) ;
    GETTER_METHOD (Window , "isActive"             , gtk_window_is_active               , gboolean) ;
    GETTER_METHOD (Window , "hasToplevelFocus"     , gtk_window_has_toplevel_focus      , gboolean) ;

    END_CONSTRUCTOR ();
}
} /* clip */
