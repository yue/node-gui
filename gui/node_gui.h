#ifndef NODE_GUI_H
#define NODE_GUI_H

#include <node.h>

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))

#define DEFINE_CPP_METHOD(Method) \
    static Handle<Value> Method (const Arguments& args)

#define DEFINE_NODE_METHOD(Name, Method) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, Method)

#define CREATE_NODE_CONSTRUCTOR(Class) \
    Local<FunctionTemplate> t = FunctionTemplate::New (New);\
    constructor_template = Persistent<FunctionTemplate>::New(t);\
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);\
    constructor_template->SetClassName(String::NewSymbol(Class));

#define CREATE_NODE_CONSTRUCTOR_INHERIT(Class, Super) \
    Local<FunctionTemplate> t = FunctionTemplate::New (New);\
    constructor_template = Persistent<FunctionTemplate>::New(t);\
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);\
    constructor_template->SetClassName(String::NewSymbol(Class));\
    constructor_template->Inherit (Super::constructor_template);

#define SIMPLE_METHOD(Class, Method, real) \
    Handle<Value> Class::Method (const Arguments& args) {\
        HandleScope scope;\
\
        Class *self = ObjectWrap::Unwrap<Class> (args.This());\
        Gtk##Class *obj = static_cast<Gtk##Class*> (self->obj_);\
\
        MainLoop::push_job_gui ([=] {\
            real (obj);\
        });\
\
        return Undefined ();\
    }

namespace clip {
void Init (v8::Handle<v8::Object> target);
} /* clip */

#endif /* end of NODE_GUI_H */
