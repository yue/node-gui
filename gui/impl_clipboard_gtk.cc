#include "impl_clipboard_gtk.h"
#include "impl_main_gtk.h"

#include <stdio.h>
#include <glibmm/thread.h>

namespace clip {
ClipboardImpl::ClipboardImpl (std::function<void (std::string)> paste) :
    paste_ (std::move (paste)),
    i_changed_board_ (false)
{
    MainLoop::push_job_gui (
            std::bind (&ClipboardImpl::create_clipboard, this));
}

void ClipboardImpl::set_data (std::string data) {
    // Set flag
    i_changed_board_ = true;

    // Tell the GUI thread to read the paste
    MainLoop::push_job_gui (std::bind (&ClipboardImpl::paste, this, data));
}

void ClipboardImpl::create_clipboard () {
    // Monitor clipboard
#ifdef WIN32
    monitor_.reset (new ClipboardImplW32 (
                std::bind (&ClipboardImpl::on_changed, this)));
#else
    Gtk::Clipboard::get ()->signal_owner_change ().connect (
            sigc::hide (sigc::mem_fun (*this, &ClipboardImpl::on_changed)));
#endif
}

void ClipboardImpl::on_changed () {
    // Guard from own changes
    if (i_changed_board_) {
        i_changed_board_ = false;
        return;
    }

    Gtk::Clipboard::get()->request_text (
            sigc::mem_fun (*this, &ClipboardImpl::on_received));
}

void ClipboardImpl::on_received (const Glib::ustring& data) {
    // Notice node
    MainLoop::push_job_node (std::bind (paste_, data));
}

void ClipboardImpl::paste (std::string data) {
    // Peek new paste to clipboard
    Gtk::Clipboard::get ()->set_text (data);
}
}
