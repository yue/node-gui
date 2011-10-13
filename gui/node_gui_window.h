#ifndef NODE_GUI_WINDOW_H
#define NODE_GUI_WINDOW_H

#include "node_gui_widget.h"
namespace clip {
class Window: public Widget {
DECLARE_NODE_OBJECT (Window);

public:
    DEFAULT_CONSTRUCTOR (Window, Widget);
    EXTERNAL_CONSTRUCTOR (Window, Widget);
};

DECLARE_GLUE (Window);
} /* clip */

#endif /* end of NODE_GUI_WINDOW_H */
