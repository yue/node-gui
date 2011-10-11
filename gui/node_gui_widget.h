#ifndef NODE_GUI_WIDGET_H
#define NODE_GUI_WIDGET_H

#include "node_gui_object.h"

namespace clip {
class Widget: public Object {
DECLARE_NODE_OBJECT (Widget);

public:
    EXTERNAL_CONSTRUCTOR (Widget);

protected:
    DEFINE_CPP_METHOD (Show);
    DEFINE_CPP_METHOD (Destroy);
    DEFINE_CPP_METHOD (Hide);
    DEFINE_CPP_METHOD (GrabFocus);
};
} /* clip */

#endif /* end of NODE_GUI_WIDGET_H */
