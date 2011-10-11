#ifndef NODE_GUI_BUILDER_H
#define NODE_GUI_BUILDER_H

#include "node_gui_object.h"

namespace clip {
class Builder: public Object {
DECLARE_NODE_OBJECT (Builder);

public:
    DEFAULT_CONSTRUCTOR (Builder);
    virtual ~Builder ();

protected:
    DEFINE_CPP_METHOD (New);
    DEFINE_CPP_METHOD (Get);
};
} /* clip */

#endif /* end of NODE_GUI_BUILDER_H */
