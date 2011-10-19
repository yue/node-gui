#ifndef NODE_GUI_TREE_PATH_H
#define NODE_GUI_TREE_PATH_H

#include "node_gui_object.h"

namespace clip {
class TreePath: public Object {
DECLARE_NODE_OBJECT (TreePath);

protected:
    DEFINE_CPP_METHOD (New);
};
} /* clip */

#endif /* end of NODE_GUI_TREE_PATH_H */
