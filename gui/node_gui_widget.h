#ifndef NODE_GUI_WIDGET_H
#define NODE_GUI_WIDGET_H

namespace clip {
class Widget {
public:
    Widget ();
    static void Init (Handle<v8::Object> target);

protected:
    static Handle<Value> New (const Arguments& args);

public:
    static Persistent<FunctionTemplate> constructor_template;

/* Not to be implemented */
private:
    Widget (const Widget&);
    Widget& operator= (const Widget&);
};
} /* clip */

#endif /* end of NODE_GUI_WIDGET_H */
