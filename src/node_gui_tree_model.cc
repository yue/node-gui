#include "node_gui_tree_model.h"

namespace clip {
Persistent<FunctionTemplate> TreeModel::constructor_template;

void TreeModel::Init (Handle<v8::Object> target) {
    ATTACH_CONSTRUCTOR ("TreeModel", TreeModel, (Constructor<TreeModel>));

    DEFINE_NODE_METHOD ("getValue", GetValue);

    GETTER_METHOD (TreeModel, "getNColumns", gtk_tree_model_get_n_columns, gint);

    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getColumnType"      , (GetterMethod<GType         , gint          , GtkTreeModel                   , gtk_tree_model_get_column_type>                                                 )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getIter"            , (GetterMethod<gboolean      , GtkTreeIter * , GtkTreePath *                  , GtkTreeModel                             , gtk_tree_model_get_iter>             )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getIterFromString"  , (GetterMethod<gboolean      , GtkTreeIter * , const gchar *                  , GtkTreeModel                             , gtk_tree_model_get_iter_from_string> )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getIterFirst"       , (GetterMethod<gboolean      , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_get_iter_first>                                                  )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getPath"            , (GetterMethod<GtkTreePath * , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_get_path>                                                        )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "iterNext"           , (GetterMethod<gboolean      , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_iter_next>                                                       )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "iterChildren"       , (GetterMethod<gboolean      , GtkTreeIter * , GtkTreeIter *                  , GtkTreeModel                             , gtk_tree_model_iter_children>        )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "hasChild"           , (GetterMethod<gboolean      , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_iter_has_child>                                                  )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "nChildren"          , (GetterMethod<gint          , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_iter_n_children>                                                 )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "iterParent"         , (GetterMethod<gboolean      , GtkTreeIter * , GtkTreeIter *                  , GtkTreeModel                             , gtk_tree_model_iter_parent>          )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getStringFromIter"  , (GetterMethod<gchar *       , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_get_string_from_iter>                                            )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "rowChanged"         , (SetterMethod<GtkTreePath * , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_row_changed>                                                     )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "rowInserted"        , (SetterMethod<GtkTreePath * , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_row_inserted>                                                    )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "rowHasChildToggled" , (SetterMethod<GtkTreePath * , GtkTreeIter * , GtkTreeModel                   , gtk_tree_model_row_has_child_toggled>                                           )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "rowDeleted"         , (SetterMethod<GtkTreePath * , GtkTreeModel  , gtk_tree_model_row_deleted>                                                                                      )) ;

    END_CONSTRUCTOR ();
}

Handle<Value> TreeModel::GetValue (const Arguments& args) {
    HandleScope scope;

    if (args.Length () != 2)
        return THROW_BAD_ARGS;

    GValue value = { 0 };

    GtkTreeModel *obj = glue<GtkTreeModel> (args.This ());
    GtkTreeIter *iter = static_cast<GtkTreeIter *> (
            Local<v8::Object>::Cast (args[0])->GetPointerFromInternalField(0));
    int column = args[1]->Int32Value ();

    gdk_threads_enter ();
    gtk_tree_model_get_value (obj, iter, column, &value);
    gdk_threads_leave ();

    Handle<Value> result = glue (&value);

    g_value_unset (&value);

    return scope.Close (result);
}
} /* clip */

