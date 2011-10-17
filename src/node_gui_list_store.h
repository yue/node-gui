#ifndef NODE_GUI_LIST_STORE_H
#define NODE_GUI_LIST_STORE_H

#include "node_gui_object.h"

namespace clip {
class ListStore: public Object {
DECLARE_NODE_OBJECT (ListStore);

protected:
    DEFINE_CPP_METHOD (New);
};
} /* clip */

#endif /* end of NODE_GUI_LIST_STORE_H */
