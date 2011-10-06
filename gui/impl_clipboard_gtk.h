#ifndef IMPL_GTK_H
#define IMPL_GTK_H

#include <string>
#include <memory>
#include <functional>

#include <node.h>
#include <gtkmm/clipboard.h>

#ifdef WIN32
#include "impl_clipboard_win.h"
#endif

namespace clip {

class ClipboardImpl {
public:
    ClipboardImpl (std::function<void (std::string)> paste);

    // Set clipboard's data
    void set_data (std::string data);

private:
#ifdef WIN32
    std::unique_ptr<ClipboardImplW32> monitor_;
#endif
    std::function<void (std::string)> paste_;

    bool i_changed_board_;

    void create_clipboard ();
    void on_changed ();
    void on_received (const Glib::ustring& data);
    void paste (std::string data);

/* Not to be implemented */
private:
    ClipboardImpl (const ClipboardImpl&);
    ClipboardImpl& operator= (const ClipboardImpl&);

};
}

#endif /* end of IMPL_LINUX_H */
