#include "node_gui_tree_view.h"

namespace clip {
Persistent<FunctionTemplate> TreeView::constructor_template;

void TreeView::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("TreeView", TreeView, Container, tree_view);

    END_CONSTRUCTOR ();
}
} /* clip */
