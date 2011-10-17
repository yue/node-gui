#include "node_gui_notebook.h"

namespace clip {
Persistent<FunctionTemplate> Notebook::constructor_template;

void Notebook::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Notebook", Notebook, Container, notebook);

    SETTER_METHOD (Notebook , "removePage"     , gtk_notebook_remove_page      , int) ;
    SIMPLE_METHOD (Notebook , "nextPage"       , gtk_notebook_next_page);
    SIMPLE_METHOD (Notebook , "prevPage"       , gtk_notebook_prev_page);
    SETTER_METHOD (Notebook , "setShowTabs"    , gtk_notebook_set_show_tabs    , gboolean) ;
    GETTER_METHOD (Notebook , "getShowTabs"    , gtk_notebook_get_show_tabs    , gboolean) ;
    SETTER_METHOD (Notebook , "setShowBorder"  , gtk_notebook_set_show_border  , gboolean) ;
    GETTER_METHOD (Notebook , "getShowBorder"  , gtk_notebook_get_show_border  , gboolean) ;
    SETTER_METHOD (Notebook , "setScrollable"  , gtk_notebook_set_scrollable   , gboolean) ;
    GETTER_METHOD (Notebook , "getScrollable"  , gtk_notebook_get_scrollable   , gboolean) ;
    SETTER_METHOD (Notebook , "setTabBorder"   , gtk_notebook_set_tab_border   , guint) ;
    SIMPLE_METHOD (Notebook , "popupEnable"    , gtk_notebook_popup_enable);
    SIMPLE_METHOD (Notebook , "popupDisable"   , gtk_notebook_popup_disable);
    GETTER_METHOD (Notebook , "getCurrentPage" , gtk_notebook_get_current_page , int) ;
    SETTER_METHOD (Notebook , "setCurrentPage" , gtk_notebook_set_current_page , int) ;
    SETTER_METHOD (Notebook , "setTabHBorder"  , gtk_notebook_set_tab_hborder  , guint) ;
    GETTER_METHOD (Notebook , "getTabHBorder"  , gtk_notebook_get_tab_hborder  , guint16) ;
    SETTER_METHOD (Notebook , "setTabVBorder"  , gtk_notebook_set_tab_vborder  , guint) ;
    GETTER_METHOD (Notebook , "getTabVBorder"  , gtk_notebook_get_tab_vborder  , guint16) ;
    GETTER_METHOD (Notebook , "getGroupId"     , gtk_notebook_get_group_id     , int) ;
    SETTER_METHOD (Notebook , "setGroupId"     , gtk_notebook_set_group_id     , int) ;
    GETTER_METHOD (Notebook , "getGroup"       , gtk_notebook_get_group        , gpointer) ;
    SETTER_METHOD (Notebook , "setGroup"       , gtk_notebook_set_group        , gpointer) ;
    GETTER_METHOD (Notebook , "getGroupName"   , gtk_notebook_get_group_name   , const gchar *) ;
    SETTER_METHOD (Notebook , "setGroupName"   , gtk_notebook_set_group_name   , const gchar *) ;

    END_CONSTRUCTOR ();
}
} /* clip */
