#ifndef NODE_GUI_WIDGET_H
#define NODE_GUI_WIDGET_H

#include "node_gui_object.h"

namespace clip {
class Widget: public Object {
DECLARE_NODE_OBJECT (Widget);

public:
    DEFAULT_CONSTRUCTOR (Widget, Object);
    EXTERNAL_CONSTRUCTOR (Widget, Object);
    virtual ~Widget ();
};
} /* clip */

#endif /* end of NODE_GUI_WIDGET_H */
