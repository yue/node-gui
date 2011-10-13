#ifndef NODE_GUI_MENU_H
#define NODE_GUI_MENU_H

#include "node_gui_widget.h"

namespace clip {
class Menu: public Widget {
DECLARE_NODE_OBJECT (Menu);

protected:
    DEFINE_CPP_METHOD (Popup);
};
} /* clip */

#endif /* end of NODE_GUI_MENU_H */
