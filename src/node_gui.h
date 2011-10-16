#ifndef NODE_GUI_H
#define NODE_GUI_H

#include <node.h>

// Easy throw exceptions
#define NODE_ERROR(str) \
    ThrowException(Exception::Error(String::New(str)))

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))

// Check is internal object
#define IS_INTERNAL(obj) \
    (obj->IsObject () && (v8::Handle<v8::Object>::Cast (obj)->InternalFieldCount () == 1))

// Wrap around existing object, don't manage its life
#define WRAP_EXSISTING_OBJECT(T) \
    if (args.Length () == 1 && args[0]->IsExternal ()) {\
        void *widget = External::Unwrap (args[0]);\
        args.This ()->SetPointerInInternalField (0, widget);\
\
        return args.This ();\
    }

// Easy for define methods
#define DEFINE_CPP_METHOD(Method) \
    static v8::Handle<v8::Value> Method (const v8::Arguments& args)

#define DEFINE_NODE_METHOD(Name, Method) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, Method)

#define SIMPLE_METHOD(Class, Name, Method) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, \
            (SetterMethod<Class, Gtk##Class, Method>));

#define SETTER_METHOD(Class, Name, Method, Type) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, \
            (SetterMethod<Type, Class, Gtk##Class, Method>));

#define GETTER_METHOD(Class, Name, Method, Type) \
    NODE_SET_PROTOTYPE_METHOD (constructor_template, Name, \
            (GetterMethod<Type, Class, Gtk##Class, Method>));

// Must have fields for object wrapper
#define DECLARE_NODE_OBJECT(Class) \
    public:\
        static void Init (Handle<v8::Object> target);\
        static Persistent<FunctionTemplate> constructor_template;\
\
    private:\
        Class (const Class&);\
        Class& operator= (const Class&)

// Ease the 'Init' implementation
#define CREATE_NODE_CONSTRUCTOR(Name, Type) \
    HandleScope scope;\
    Local<String> symbol = String::NewSymbol(Name);\
    Local<FunctionTemplate> t = FunctionTemplate::New (New);\
    constructor_template = Persistent<FunctionTemplate>::New(t);\
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);\
    constructor_template->SetClassName(symbol)

#define CREATE_NODE_CONSTRUCTOR_INHERIT(Name, Type, Super) \
    CREATE_NODE_CONSTRUCTOR(Name, Type);\
    constructor_template->Inherit (Super::constructor_template)

#define CREATE_CUSTOM_NODE_CONSTRUCTOR(Name, Type, Super, Method) \
    HandleScope scope;\
    Local<String> symbol = String::NewSymbol(Name);\
    Local<FunctionTemplate> t = FunctionTemplate::New (Object::NewMethod<Type, gtk_##Method##_get_type>);\
    constructor_template = Persistent<FunctionTemplate>::New(t);\
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);\
    constructor_template->SetClassName(symbol);\
    constructor_template->Inherit (Super::constructor_template)

#define END_CONSTRUCTOR() \
    target->Set (symbol, t->GetFunction ())

namespace clip {
void Init (v8::Handle<v8::Object> target);
} /* clip */

#endif /* end of NODE_GUI_H */
