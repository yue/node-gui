#include "clipboard.h"

namespace clip {
Init (Handle<Object> target)
{
    HandleScope scope;

    clip::Clipboard::Init (target);
}
}

// Under Windows, this module will be compiled into node
NODE_MODULE(node_gui, clip::Clipboard::Init);
