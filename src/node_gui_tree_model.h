#ifndef NODE_GUI_TREE_MODEL_H
#define NODE_GUI_TREE_MODEL_H

#include "node_gui_object.h"

namespace clip {
class TreeModel: public Object {
DECLARE_NODE_OBJECT (TreeModel);

protected:
    DEFINE_CPP_METHOD (GetValue);
};
} /* clip */

#endif /* end of NODE_GUI_TREE_MODEL_H */
