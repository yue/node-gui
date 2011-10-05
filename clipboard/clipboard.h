#ifndef CLIPBOARD_H
#define CLIPBOARD_H

#include <memory>
#include <node.h>
using namespace node;
using namespace v8;

namespace clip {
class Impl;

class Clipboard: ObjectWrap {
public:
    Clipboard ();
    virtual ~Clipboard ();

    static void Init (Handle<Object> target);

protected:
    static Handle<Value> New (const Arguments& args);
    static Handle<Value> Paste (const Arguments& args);

private:
    static Persistent<FunctionTemplate> constructor_template;

    uv_async_t clip_changed_;
    std::unique_ptr<Impl> impl_;
    static void on_clip_changed (uv_async_t *handle, int status);

/* Not to be implemented */
private:
    Clipboard (const Clipboard&);
    Clipboard& operator= (const Clipboard&);

};
}

#endif /* end of CLIPBOARD_H */
