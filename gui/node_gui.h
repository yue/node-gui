#ifndef NODE_GUI_H
#define NODE_GUI_H

#include <node.h>

// Easy throw exceptions
#define NODE_ERROR(str) \
    ThrowException(Exception::Error(String::New(str)))

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))

// Wrap around existing object, don't manage its life
#define WRAP_EXSISTING_OBJECT(T) \
    if (args.Length () == 1 && args[0]->IsExternal ()) {\
        void *obj = External::Unwrap (args[0]);\
        T *self = new T (obj);\
\
        self->Wrap (args.This ());\
        return args.This ();\
    }

// Easy for daily node things
#define DEFINE_CPP_METHOD(Method) \
    static Handle<Value> Method (const Arguments& args)

#define DEFINE_NODE_METHOD(Name, Method) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, Method)

#define SIMPLE_METHOD(Class, Name, Method) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, \
            (SimpleMethod<Class, Gtk##Class, Method>));

#define SETTER_METHOD(Class, Type, Name, Method) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, \
            (SetterMethod<Type, Class, Gtk##Class, Method>));

#define DECLARE_NODE_OBJECT(Class) \
    public:\
        static void Init (Handle<v8::Object> target);\
        static Persistent<FunctionTemplate> constructor_template;\
\
    private:\
        Class (const Class&);\
        Class& operator= (const Class&)

#define DEFAULT_CONSTRUCTOR(Class) \
    Class () : Object () { }

#define EXTERNAL_CONSTRUCTOR(Class) \
    Class (void *external) : Object (external) { }

#define CREATE_NODE_CONSTRUCTOR(Class, Type) \
    HandleScope scope;\
    Local<String> symbol = String::NewSymbol(Class);\
    Local<FunctionTemplate> t = FunctionTemplate::New (New);\
    constructor_template = Persistent<FunctionTemplate>::New(t);\
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);\
    constructor_template->SetClassName(String::NewSymbol(Class))

#define CREATE_NODE_CONSTRUCTOR_INHERIT(Class, Type, Super) \
    HandleScope scope;\
    Local<String> symbol = String::NewSymbol(Class);\
    Local<FunctionTemplate> t = FunctionTemplate::New (New);\
    constructor_template = Persistent<FunctionTemplate>::New(t);\
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);\
    constructor_template->SetClassName(String::NewSymbol(Class));\
    constructor_template->Inherit (Super::constructor_template)

#define END_CONSTRUCTOR() \
    target->Set (symbol, t->GetFunction ())

namespace clip {
void Init (v8::Handle<v8::Object> target);
} /* clip */

#endif /* end of NODE_GUI_H */
