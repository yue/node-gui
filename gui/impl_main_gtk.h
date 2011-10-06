#ifndef IMPL_MAIN_GTK_H
#define IMPL_MAIN_GTK_H

#include "impl_channel_gtk.hpp"
#include "impl_async_wrap.h"
#include <glibmm/thread.h>
#include <glibmm/dispatcher.h>

namespace clip {
    class MainLoop {
    public:
        // Only the node thread can access it!!
        static MainLoop *get ();

        // Used by node and gui thread to transfer jobs
        typedef Channel<AsyncDispatcher,
                        Glib::Dispatcher,
                        Glib::Mutex,
                        Glib::Mutex::Lock> MyChannel;
        std::unique_ptr<MyChannel> channel;

    private:
        static MainLoop* self;

        MainLoop ();
        void main ();

        template<MyChannel::JOB_TYPE>
        void do_jobs ();

    /* Not to be implemented */
    private:
        MainLoop (const MainLoop&);
        MainLoop& operator= (const MainLoop&);

    };
} /* clip */

#endif /* end of IMPL_MAIN_GTK_H */
