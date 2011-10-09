#ifndef NODE_GUI_H
#define NODE_GUI_H

#include <node.h>

#define DEFINE_SIMPLE_METHOD(Method) \
    static Handle<Value> Method (const Arguments& args)

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
