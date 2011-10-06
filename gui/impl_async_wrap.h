#ifndef IMPL_ASYNC_WRAP_H
#define IMPL_ASYNC_WRAP_H

#include <node.h>
#include <functional>

namespace clip {
// Wrap uv_async_t as a signal-style class
class AsyncDispatcher {
public:
    typedef std::function<void ()> Callback;

    AsyncDispatcher (Callback callback);
    void emit ();

private:
    uv_async_t handle_;
    Callback callback_;
    static void on_async (uv_async_t *handle, int status);

/* Not to be implemented */
private:
    AsyncDispatcher (const AsyncDispatcher&);
    AsyncDispatcher& operator= (const AsyncDispatcher&);
};
} /* clip */

#endif /* end of IMPL_ASYNC_WRAP_H */
