#include "node_gui.h"
#include "node_clipboard.h"

namespace clip {
void Init (Handle<Object> target) {
    HandleScope scope;
    clip::Clipboard::Init (target);
}
} /* clip */

#ifdef WIN32
NODE_MODULE(node_gui, clip::Init)
#endif
