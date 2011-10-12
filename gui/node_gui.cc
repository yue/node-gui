#include "node_gui.h"
#include "node_gui_type.h"
#include "node_gui_clipboard.h"
#include "node_gui_object.h"
#include "node_gui_widget.h"
#include "node_gui_builder.h"
#include "node_gui_status_icon.h"

namespace clip {
void Init (Handle<v8::Object> target) {
    HandleScope scope;

    uv_ref (uv_default_loop ());

    clip::Type::Init (target);
    clip::Clipboard::Init (target);
    clip::Object::Init (target);
    clip::Widget::Init (target);
    clip::Builder::Init (target);
    clip::StatusIcon::Init (target);
}
} /* clip */

#ifdef WIN32
NODE_MODULE(node_gui, clip::Init)
#endif
