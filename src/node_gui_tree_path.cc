#include "node_gui_tree_path.h"

namespace clip {
Persistent<FunctionTemplate> TreePath::constructor_template;

void TreePath::Init (Handle<v8::Object> target) {
    ATTACH_CONSTRUCTOR ("TreePath", TreePath, New);
    ATTACH_INHERITANCE (Object);

    GETTER_METHOD (TreePath , "toString"     , gtk_tree_path_to_string     , gchar *  ) ;
    SETTER_METHOD (TreePath , "appendIndex"  , gtk_tree_path_append_index  , gint     ) ;
    SETTER_METHOD (TreePath , "prependIndex" , gtk_tree_path_prepend_index , gint     ) ;
    GETTER_METHOD (TreePath , "getDepth"     , gtk_tree_path_get_depth     , gint     ) ;
    SIMPLE_METHOD (TreePath , "free"         , gtk_tree_path_free                     ) ;
    SIMPLE_METHOD (TreePath , "next"         , gtk_tree_path_next                     ) ;
    GETTER_METHOD (TreePath , "prev"         , gtk_tree_path_prev          , gboolean ) ;
    GETTER_METHOD (TreePath , "up"           , gtk_tree_path_up            , gboolean ) ;
    SIMPLE_METHOD (TreePath , "down"         , gtk_tree_path_down                     ) ;

    NODE_SET_PROTOTYPE_METHOD (constructor_template , "isAncestor"   , (GetterMethod<gboolean , GtkTreePath * , GtkTreePath , gtk_tree_path_is_ancestor>   )) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "isDescendant" , (GetterMethod<gboolean , GtkTreePath * , GtkTreePath , gtk_tree_path_is_descendant> )) ;

    END_CONSTRUCTOR ();
}

Handle<Value> TreePath::New (const Arguments& args) {
    HandleScope scope;

    void *path;

    if (args.Length () == 0)
        path = gtk_tree_path_new ();
    else if (args.Length () == 1 && args[0]->IsString ())
        path = gtk_tree_path_new_from_string (*String::Utf8Value (args[0]));
    else
        return THROW_BAD_ARGS;

    args.This ()->SetPointerInInternalField (0, path);
    args.This ()->SetPointerInInternalField (1, nullptr);
    return args.This ();
}
} /* clip */
