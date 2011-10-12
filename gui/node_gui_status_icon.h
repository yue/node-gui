#ifndef NODE_GUI_STATUS_ICON_H
#define NODE_GUI_STATUS_ICON_H

#include "node_gui_widget.h"

namespace clip {
class StatusIcon: public Widget {
DECLARE_NODE_OBJECT (StatusIcon);

public:
    DEFAULT_CONSTRUCTOR (StatusIcon, Widget);
    EXTERNAL_CONSTRUCTOR (StatusIcon, Widget);
};
} /* clip */

#endif /* end of NODE_GUI_STATUS_ICON_H */
