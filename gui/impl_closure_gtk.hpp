#ifndef IMPL_CLOSURE_H
#define IMPL_CLOSURE_H

#include <vector>

#include <node.h>
#include <glib-object.h>

namespace clip {
using namespace node;
using namespace v8;

struct NodeClosure {
    GClosure closure;
    Persistent<Function> callback;

    static GClosure* create (Local<Value> callback) {
        HandleScope scope;

        // Save function to GClosure
        GClosure *closure = g_closure_new_simple (sizeof (NodeClosure), 0);
        ((NodeClosure*) closure)->callback = 
                Persistent<Function>::New (Local<Function>::Cast (callback));
        g_closure_add_invalidate_notifier (closure, NULL, closure_invalidate);

        return closure;
    }

    static void closure_invalidate (gpointer data, GClosure *closure) {
        v8::Locker locker;

        ((NodeClosure*) closure)->callback.Dispose ();
    }
};
} /* clip */

#endif /* end of IMPL_CLOSURE_H */
