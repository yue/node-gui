#include "node_gui_object.h"
#include <gtkmm/object.h>

#define THROW_BAD_ARGS \
    ThrowException(Exception::TypeError(String::New("Bad argument")))
#define GET_OBJECT(x) \
    static_cast< x *>(args.This()->GetPointerFromInternalField(0))

inline static Glib::ValueBase toGValue (Handle<Value> value) {
    if (value->IsString ()) {
        Glib::Value<std::string> r;
        r.set (*String::Utf8Value (value));
        return r;
    } else if (value->IsInt32 ()) {
        Glib::Value<int> r;
        r.set (value->Int32Value ());
        return r;
    } else if (value->IsBoolean ()) {
        Glib::Value<bool> r;
        r.set (value->BooleanValue ());
        return r;
    } else {
        Glib::Value<double> r;
        r.set (value->NumberValue ());
        return r;
    }
}

namespace clip {
Persistent<FunctionTemplate> Object::constructor_template;

Object::Object ()
{
}

void Object::Init (Handle<v8::Object> target) {
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (New);
    constructor_template = Persistent<FunctionTemplate>::New(t);
    constructor_template->InstanceTemplate()->SetInternalFieldCount(1);
    constructor_template->SetClassName(String::NewSymbol("Object"));

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "setProperty",
                               SetProperty);
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "getProperty",
                               GetProperty);
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "on", On);
    target->Set (String::NewSymbol ("Object"), t->GetFunction ());
}

Handle<Value> Object::New (const Arguments& args) {
    HandleScope scope;

    return ThrowException(Exception::TypeError(String::New(
                    "Object is not allow to be manually created")));
}

Handle<Value> Object::SetProperty (const Arguments& args) {
    HandleScope scope;

    if (!args.Length () == 2 ||
        !args[0]->IsString ())
    {
        return THROW_BAD_ARGS;
    }

    Gtk::Object *obj = GET_OBJECT (Gtk::Object);
    obj->set_property_value (*String::Utf8Value (args[0]),
                             toGValue (args[1]));

    return Undefined ();
}

Handle<Value> Object::GetProperty (const Arguments& args) {
    HandleScope scope;

    if (!args.Length () == 2 ||
        !args[0]->IsString ())
    {
        return THROW_BAD_ARGS;
    }

    Gtk::Object *obj = GET_OBJECT (Gtk::Object);
    Glib::Value<std::string> r;
    obj->get_property_value (*String::Utf8Value (args[0]), r);

    return scope.Close (String::New (r.get().c_str ()));
}

Handle<Value> Object::On (const Arguments& args) {
    HandleScope scope;

    if (!args.Length () == 2 ||
        !args[0]->IsString () ||
        !args[1]->IsFunction ())
    {
        return THROW_BAD_ARGS;
    }

    return Undefined ();
}
} /* clip */
