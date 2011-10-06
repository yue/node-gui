#ifndef NODE_GUI_BUILDER_H
#define NODE_GUI_BUILDER_H

#include <string>
#include <node.h>
using namespace node;
using namespace v8;

#include <gtkmm/builder.h>
#include <glibmm/refptr.h>

namespace clip {
class Builder: ObjectWrap {
public:
    Builder (std::string filename);
    static void Init (Handle<v8::Object> target);

protected:
    static Handle<Value> New (const Arguments& args);
    static Handle<Value> Destroy (const Arguments& args);
    static Handle<Value> Get (const Arguments& args);

private:
    static Persistent<FunctionTemplate> constructor_template;
    Glib::RefPtr<Gtk::Builder> builder_;

    void create (std::string filename);

/* Not to be implemented */
private:
    Builder (const Builder&);
    Builder& operator= (const Builder&);

};
} /* clip */

#endif /* end of NODE_GUI_BUILDER_H */
