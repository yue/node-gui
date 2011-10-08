#include "node_gui_object.h"
#include "node_gui_widget.h"
#include "impl_widget_gtk.hpp"
#include "impl_mainloop_gtk.h"

namespace clip {
Persistent<FunctionTemplate> Widget::constructor_template;
    
Widget::Widget () {
}

void Widget::Init (Handle<v8::Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    constructor_template = Persistent<FunctionTemplate>::New(t);
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);
    constructor_template->SetClassName(String::NewSymbol("Widget"));
    constructor_template->Inherit (Object::constructor_template);

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "show", Show);
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "destroy", Destroy);
    target->Set (String::NewSymbol ("Widget"), t->GetFunction ());
}

Handle<Value> Widget::New (const Arguments& args) {
    HandleScope scope;

    // Init from exsiting gtk::widget
    if (args.Length () == 1 && args[0]->IsExternal ()) {
        // Mannualy set WidgetImpl, we will not manage memory for gtk widget
        Widget *self = new Widget ();
        self->impl_.reset (new WidgetImpl (args[0]));

        self->Wrap (args.This ());
        self->Ref ();
        return args.This ();
    }

    return ThrowException(Exception::TypeError(String::New(
                    "Widget is not allow to be manually created")));
}

Handle<Value> Widget::Show (const Arguments& args) {
    HandleScope scope;

    Widget *self = ObjectWrap::Unwrap<Widget> (args.This());
    MainLoop::push_job_gui ([=] {
        self->impl_->show ();
    });

    return Undefined ();
}

Handle<Value> Widget::Destroy (const Arguments& args) {
    HandleScope scope;

    // Destroy gtk::widget
    Widget *self = ObjectWrap::Unwrap<Widget> (args.This());
    MainLoop::push_job_gui ([=] {
        self->impl_->destroy ();
    });

    return Undefined ();
}
} /* clip */
