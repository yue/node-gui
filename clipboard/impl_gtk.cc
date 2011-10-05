#include "impl_gtk.h"
#include <stdio.h>
#include <glibmm/thread.h>

namespace clip {
Impl::Impl (uv_async_t *clip_changed):
    i_changed_board_ (false),
    clip_changed_ (clip_changed)
{
    Glib::thread_init ();
    Glib::Thread::create (
            sigc::mem_fun (*this, &Impl::main), false);
}

Impl::~Impl () {
    signal_quit_->emit ();
}

void Impl::set_data (const char *data) {
    // Save the paste
    paste_ = data;

    // Tell the gtk thread to read the paste
    if (signal_paste_) {
        i_changed_board_ = true;
        signal_paste_->emit ();
    }
}

void Impl::main () {
    Gtk::Main kit (NULL, NULL);

    // Monitor clipboard
    Glib::RefPtr<Gtk::Clipboard> refClipboard = Gtk::Clipboard::get();
    refClipboard->signal_owner_change ().connect (
            sigc::mem_fun (*this, &Impl::on_changed));

    // An inter-thread signal for quit main thread
    signal_quit_.reset (new Glib::Dispatcher ());
    signal_quit_->connect (sigc::ptr_fun (Gtk::Main::quit));

    // An inter-thread signal for pasting
    signal_paste_.reset (new Glib::Dispatcher ());
    signal_paste_->connect (sigc::mem_fun (*this, &Impl::on_paste));

    Gtk::Main::run ();
}

void Impl::on_changed (GdkEventOwnerChange*) {
    // Guard from own changes
    if (i_changed_board_) {
        i_changed_board_ = false;
        return;
    }

    Gtk::Clipboard::get()->request_text (
            sigc::mem_fun (*this, &Impl::on_received));
}

void Impl::on_received (const Glib::ustring& data) {
    buffer_ = data;

    // Notice libev
    uv_async_send (clip_changed_);
}

void Impl::on_paste () {
    // Peek new paste to clipboard
    Gtk::Clipboard::get ()->set_text (paste_);
}
}
