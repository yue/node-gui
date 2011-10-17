#include "node_gui_list.h"

namespace clip {
Persistent<FunctionTemplate> List::constructor_template;

void List::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("List", List, Widget, list);

    END_CONSTRUCTOR ();
}
} /* clip */
