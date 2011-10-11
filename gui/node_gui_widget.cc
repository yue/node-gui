#include <gtk/gtk.h>

#include "node_gui_widget.h"
#include "impl_mainloop_gtk.h"

namespace clip {
Persistent<FunctionTemplate> Widget::constructor_template;

void Widget::Init (Handle<v8::Object> target) {
    CREATE_NODE_CONSTRUCTOR_INHERIT ("Widget", Widget, Object);

    SIMPLE_METHOD (Widget , "show"      , gtk_widget_show_all);
    SIMPLE_METHOD (Widget , "destroy"   , gtk_widget_destroy);
    SIMPLE_METHOD (Widget , "hide"      , gtk_widget_hide);
    SIMPLE_METHOD (Widget , "grabFocus" , gtk_widget_grab_focus);

    END_CONSTRUCTOR ();
}
} /* clip */
