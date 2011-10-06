#ifndef NODE_GUI_OBJECT_H
#define NODE_GUI_OBJECT_H

#include <node.h>
using namespace node;
using namespace v8;

namespace clip {
class Object {
public:
    Object ();
    static void Init (Handle<v8::Object> target);

protected:
    static Handle<Value> New (const Arguments& args);
    static Handle<Value> SetProperty (const Arguments& args);
    static Handle<Value> GetProperty (const Arguments& args);
    static Handle<Value> On (const Arguments& args);

public:
    static Persistent<FunctionTemplate> constructor_template;

/* Not to be implemented */
private:
    Object (const Object&);
    Object& operator= (const Object&);

};
} /* clip */

#endif /* end of NODE_GUI_OBJECT_H */
