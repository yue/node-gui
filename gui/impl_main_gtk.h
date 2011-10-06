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

        // Helper for Channel::push_job
        static void push_job_gui (MyChannel::Task&& t) {
            get ()->channel->push_job<MyChannel::GUI> (
                    std::forward<MyChannel::Task> (t));
            get ()->channel->emit_gui ();
        }
        static void push_job_node (MyChannel::Task&& t) {
            get ()->channel->push_job<MyChannel::NODE> (
                    std::forward<MyChannel::Task> (t));
            get ()->channel->emit_node ();
        }

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
