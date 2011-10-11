#ifndef NODE_GUI_OBJECT_H
#define NODE_GUI_OBJECT_H

#include <node.h>
#include <glib-object.h>

#include "node_gui.h"

namespace clip {
using namespace node;
using namespace v8;

class Object: public ObjectWrap {
DECLARE_NODE_OBJECT (Object);

public:
    Object ();
    Object (void *external);
    virtual ~Object ();

protected:
    DEFINE_CPP_METHOD (New);
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
};
} /* clip */

#endif /* end of NODE_GUI_OBJECT_H */
