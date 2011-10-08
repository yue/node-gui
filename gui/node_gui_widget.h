#ifndef NODE_GUI_WIDGET_H
#define NODE_GUI_WIDGET_H

#include <memory>
#include <node.h>

namespace clip {
class WidgetImpl;

using namespace v8;
using namespace node;

class Widget: ObjectWrap {
public:
    Widget ();
    static void Init (Handle<v8::Object> target);

protected:
    static Handle<Value> New (const Arguments& args);
    static Handle<Value> Show (const Arguments& args);
    static Handle<Value> Destroy (const Arguments& args);

public:
    std::unique_ptr<WidgetImpl> impl_;
    static Persistent<FunctionTemplate> constructor_template;

/* Not to be implemented */
private:
    Widget (const Widget&);
    Widget& operator= (const Widget&);
};
} /* clip */

#endif /* end of NODE_GUI_WIDGET_H */
