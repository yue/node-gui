#include "impl_linux.h"
#include <stdio.h>

Impl::Impl (ev_async *clip_changed):
    thread_ (&Impl::main, this),
    clip_changed_ (clip_changed)
{
}

Impl::~Impl () {
    signal_quit_->emit ();
    thread_.join ();
}

void Impl::set_data (const char *data) {
    // Save the paste
    paste_ = data;

    // Tell the gtk thread to read the paste
    if (signal_paste_)
        signal_paste_->emit ();
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
    Gtk::Clipboard::get()->request_text (
            sigc::mem_fun (*this, &Impl::on_received));
}

void Impl::on_received (const Glib::ustring& data) {
    buffer_ = data;

    // Notice libev
    ev_async_send (EV_DEFAULT_UC_ clip_changed_);
}

void Impl::on_paste () {
    // Peek new paste to clipboard
    Gtk::Clipboard::get ()->set_text (paste_);
}
