#include "node_gui.h"
#include "node_gui_global.h"
#include "impl_mainloop_gtk.h"

namespace clip {
using namespace v8;

void Global::Init (v8::Handle<v8::Object> target) {
    NODE_SET_METHOD (target, "ready", Ready);
}

Handle<Value> Global::Ready (const Arguments& args) {
    if (args.Length () != 1 || !args[0]->IsFunction ())
        return THROW_BAD_ARGS;

    // Save callback
    Persistent<Function> callback = Persistent<Function>::New (
            Local<Function>::Cast (args[0]));

    // In GTK
    MainLoop::push_job_gui ([=] () mutable {
        // Notify gtk is ready
        MainLoop::push_job_node ([=] () mutable {
            callback->Call (Context::GetCurrent ()->Global (), 0, NULL);
            callback.Dispose ();
        });
    });

    return Undefined ();
}

} /* clip */
