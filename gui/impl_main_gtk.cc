#include "impl_main_gtk.h"
#include <gtkmm/main.h>
#include <stdio.h>

namespace clip {
MainLoop* MainLoop::self = NULL;

MainLoop* MainLoop::get () {
    if (self)
        return self;
    else
        return (self = new MainLoop ());
}

MainLoop::MainLoop ()
{
    Glib::thread_init ();

    // Init channel after thread_init
    channel.reset (new MyChannel ());

    // Init signal in node thread
    channel->init (new AsyncDispatcher (
                std::bind (&MainLoop::do_jobs<MyChannel::NODE>, this)));

    Glib::Thread::create (sigc::mem_fun (*this, &MainLoop::main), false);
}

void MainLoop::main () {
    // Enter GTK main loop in new thread
    Gtk::Main kit (NULL, NULL);

    // Init signal in gui thread
    Glib::Dispatcher *sig = new Glib::Dispatcher ();
    sig->connect (sigc::mem_fun (
                *this, &MainLoop::do_jobs<MyChannel::GUI>));
    channel->init (sig);

    Gtk::Main::run ();
}

template<MainLoop::MyChannel::JOB_TYPE type>
void MainLoop::do_jobs () {
    // Fetch and do jobs
    MyChannel::JobsList list = channel->move_jobs<type> ();
    for (auto it = list.begin (); it != list.end (); ++it) {
        std::get<0> (*it) ();
    }
}
} /* clip */
