#include <gtk/gtk.h>

#include "node_gui_object.h"
#include "node_gui_widget.h"
#include "impl_mainloop_gtk.h"

namespace clip {
Persistent<FunctionTemplate> Widget::constructor_template;

void Widget::Init (Handle<v8::Object> target) {
    HandleScope scope;

    CREATE_NODE_CONSTRUCTOR_INHERIT ("Widget", Object);

    DEFINE_NODE_METHOD ("show"      , Show);
    DEFINE_NODE_METHOD ("destroy"   , Destroy);
    DEFINE_NODE_METHOD ("hide"      , Hide);
    DEFINE_NODE_METHOD ("grabFocus" , GrabFocus);

    target->Set (String::NewSymbol ("Widget"), t->GetFunction ());
}

Handle<Value> Widget::New (const Arguments& args) {
    HandleScope scope;

    // Init from exsiting gtk::widget
    if (args.Length () == 1 && args[0]->IsExternal ()) {
        void *obj = External::Unwrap (args[0]);
        Widget *self = new Widget (obj);

        self->Wrap (args.This ());
        return args.This ();
    }

    return ThrowException(Exception::TypeError(String::New(
                    "Widget is not allow to be manually created")));
}

SIMPLE_METHOD (Widget, Show, gtk_widget_show_all);
SIMPLE_METHOD (Widget, Destroy, gtk_widget_destroy);
SIMPLE_METHOD (Widget, Hide, gtk_widget_hide);
SIMPLE_METHOD (Widget, GrabFocus, gtk_widget_grab_focus);
} /* clip */
