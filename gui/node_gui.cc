#include "node_gui.h"
#include "node_gui_clipboard.h"
#include "node_gui_object.h"
#include "node_gui_widget.h"
#include "node_gui_builder.h"

namespace clip {
void Init (Handle<v8::Object> target) {
    HandleScope scope;

    clip::Clipboard::Init (target);
    clip::Object::Init (target);
    clip::Widget::Init (target);
    clip::Builder::Init (target);
}
} /* clip */

#ifdef WIN32
NODE_MODULE(node_gui, clip::Init)
#endif
