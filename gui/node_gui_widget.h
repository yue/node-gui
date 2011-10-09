#ifndef NODE_GUI_WIDGET_H
#define NODE_GUI_WIDGET_H

#include <node.h>
#include "node_gui.h"
#include "node_gui_object.h"

namespace clip {
using namespace v8;
using namespace node;

class Widget: public Object {
public:
    Widget (void *external) : Object (external) { }
    static void Init (Handle<v8::Object> target);

protected:
    static Handle<Value> New (const Arguments& args);
    DEFINE_SIMPLE_METHOD (Show);
    DEFINE_SIMPLE_METHOD (Destroy);
    DEFINE_SIMPLE_METHOD (Hide);
    DEFINE_SIMPLE_METHOD (GrabFocus);

public:
    static Persistent<FunctionTemplate> constructor_template;

/* Not to be implemented */
private:
    Widget (const Widget&);
    Widget& operator= (const Widget&);
};
} /* clip */

#endif /* end of NODE_GUI_WIDGET_H */
