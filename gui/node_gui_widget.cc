#include "node_gui_object.h"
#include "node_gui_widget.h"

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

    target->Set (String::NewSymbol ("Widget"), t->GetFunction ());
}

Handle<Value> Widget::New (const Arguments& args) {
    HandleScope scope;

    return args.This ();
//    return ThrowException(Exception::TypeError(String::New(
//                    "Widget is not allow to be manually created")));
}
} /* clip */
