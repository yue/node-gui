#include "node_gui_status_icon.h"

namespace clip {
Persistent<FunctionTemplate> StatusIcon::constructor_template;
    
void StatusIcon::Init (Handle<v8::Object> target) {
    CREATE_NODE_CONSTRUCTOR_INHERIT ("StatusIcon", StatusIcon, Object);

    END_CONSTRUCTOR ();
}
} /* clip */
