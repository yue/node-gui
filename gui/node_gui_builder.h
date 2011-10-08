#ifndef NODE_GUI_BUILDER_H
#define NODE_GUI_BUILDER_H

#include <memory>
#include <node.h>

namespace clip {
class BuilderImpl;

using namespace node;
using namespace v8;

class Builder: ObjectWrap {
public:
    Builder ();
    static void Init (Handle<v8::Object> target);

protected:
    static Handle<Value> New (const Arguments& args);
    static Handle<Value> Destroy (const Arguments& args);
    static Handle<Value> Get (const Arguments& args);

private:
    void after_create ();

    std::unique_ptr<BuilderImpl> impl_;
    Persistent<Function> callback_;

    static Persistent<FunctionTemplate> constructor_template;

/* Not to be implemented */
private:
    Builder (const Builder&);
    Builder& operator= (const Builder&);

};
} /* clip */

#endif /* end of NODE_GUI_BUILDER_H */
