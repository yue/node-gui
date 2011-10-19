#include "node_gui_tree_iter.h"

namespace clip {
Persistent<FunctionTemplate> TreeIter::constructor_template;

void TreeIter::Init (Handle<v8::Object> target) {
    ATTACH_CONSTRUCTOR ("TreeIter", TreeIter, (New<TreeIter, GtkTreeIter>));

    SIMPLE_METHOD (TreeIter, "free", gtk_tree_iter_free);

    END_CONSTRUCTOR ();
}
} /* clip */
