#include <stdio.h>
#include <gtkmm/main.h>
#include <gtkmm/clipboard.h>

void on_received (const Glib::ustring& data) {
    fprintf (stdout, "data: %s\n", data.c_str());
}

void on_changed (GdkEventOwnerChange*) {
    Gtk::Clipboard::get()->request_text (sigc::ptr_fun (on_received));
}

int main(int argc, char *argv[])
{
  Gtk::Main kit(argc, argv);

  Glib::RefPtr<Gtk::Clipboard> refClipboard = Gtk::Clipboard::get();
  refClipboard->signal_owner_change ().connect (sigc::ptr_fun (on_changed));

  Gtk::Main::run();

  return 0;
}
