#include <gtk/gtk.h>

#include "node_gui_widget.h"
#include "impl_mainloop_gtk.h"

namespace clip {
Persistent<FunctionTemplate> Widget::constructor_template;

void Widget::Init (Handle<v8::Object> target) {
    HandleScope scope;

    CREATE_NODE_CONSTRUCTOR_INHERIT ("Widget", Widget, Object);

    DEFINE_NODE_METHOD ("show"      , Show);
    DEFINE_NODE_METHOD ("destroy"   , Destroy);
    DEFINE_NODE_METHOD ("hide"      , Hide);
    DEFINE_NODE_METHOD ("grabFocus" , GrabFocus);

    target->Set (String::NewSymbol ("Widget"), t->GetFunction ());
}

SIMPLE_METHOD (Widget, Show, gtk_widget_show_all);
SIMPLE_METHOD (Widget, Destroy, gtk_widget_destroy);
SIMPLE_METHOD (Widget, Hide, gtk_widget_hide);
SIMPLE_METHOD (Widget, GrabFocus, gtk_widget_grab_focus);
} /* clip */
