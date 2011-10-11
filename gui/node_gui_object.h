#ifndef NODE_GUI_OBJECT_H
#define NODE_GUI_OBJECT_H

#include <node.h>
#include <glib-object.h>

#include "node_gui.h"

namespace clip {
using namespace node;
using namespace v8;

class Object: public ObjectWrap {
public:
    Object ();
    Object (void *external);
    virtual ~Object ();

    static void Init (Handle<v8::Object> target);
    static Handle<Value> NewInstance (void *);

protected:
    template<class T = Object>
    static Handle<Value> New (const Arguments& args) {
        HandleScope scope;

        // Init from exsiting gtk::object
        if (args.Length () == 1 && args[0]->IsExternal ()) {
            void *obj = External::Unwrap (args[0]);
            T *self = new T (obj);

            self->Wrap (args.This ());
            return args.This ();
        } else if (args.This ()->InternalFieldCount () == 1) {
            return args.This ();
        }

        return ThrowException(Exception::TypeError(String::New(
                        "Object is not allow to be manually created")));
    }

    DEFINE_CPP_METHOD (On);
    DEFINE_CPP_METHOD (GetProperty);
    DEFINE_CPP_METHOD (SetProperty);

protected:
    void *obj_; // Raw GTK+ object pointer
    bool host_; // Whether we should manage its life

    static void signal_marshal (GClosure *closure,
                                GValue *return_value,
                                guint n_param_values,
                                const GValue *param_values,
                                gpointer invocation_hint,
                                gpointer marshal_data);

public:
    static Persistent<FunctionTemplate> constructor_template;

/* Not to be implemented */
private:
    Object (const Object&);
    Object& operator= (const Object&);

};
} /* clip */

#endif /* end of NODE_GUI_OBJECT_H */
