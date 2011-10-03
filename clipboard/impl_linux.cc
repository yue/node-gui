#include "impl_linux.h"

Impl::Impl (ev_async *ev):
    lock_ (PTHREAD_MUTEX_INITIALIZER),
    ev_ (ev)
{
    pthread_create (&handle_, NULL, main, this);
}

Impl::~Impl () {
    pthread_mutex_destroy (&lock_);
}

void Impl::set_data (const char *data) {
    Gtk::Clipboard::get ()->set_text (data);
}

void *Impl::main (void *arg) {
    Impl *self = static_cast<Impl*> (arg);

    Gtk::Main kit (NULL, NULL);

    Glib::RefPtr<Gtk::Clipboard> refClipboard = Gtk::Clipboard::get();
    refClipboard->signal_owner_change ().connect (
            sigc::bind (sigc::ptr_fun (on_changed), self));

    Gtk::Main::run ();

    return NULL;
}

void Impl::on_changed (GdkEventOwnerChange*, Impl *self) {
    Gtk::Clipboard::get()->request_text (
            sigc::bind (sigc::ptr_fun (on_received), self));
}

void Impl::on_received (const Glib::ustring& data, Impl *self) {
    self->lock ();
    self->buffer_ = data;
    self->unlock ();

    // Notice libev
    ev_async_send (EV_DEFAULT_UC_ self->ev_);
}

