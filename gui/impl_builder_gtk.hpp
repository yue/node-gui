#ifndef IMPL_BUILDER_H
#define IMPL_BUILDER_H

#include <functional>
#include <string>
#include <gtkmm/builder.h>
#include <glibmm/refptr.h>

#include "node_gui_widget.h"

namespace clip {
class BuilderImpl {
public:
    BuilderImpl () { }

    void create () {
        builder_ = Gtk::Builder::create ();
    }

    void create (const std::string& filename) {
        builder_ = Gtk::Builder::create_from_file (filename);
    }

    void destroy () {
        builder_.reset ();
    }

    void add_from_string (const std::string& content) {
        builder_->add_from_string (content);
    }

    void add_from_file (const std::string& filename) {
        builder_->add_from_file (filename);
    }

    Gtk::Widget* get (const std::string& name) {
        Gtk::Widget *tmp;

        gdk_threads_enter();
        builder_->get_widget (name, tmp);
        gdk_threads_leave();

        return tmp;
    }

    v8::Local<Object> get_widget (const std::string& name) {
        HandleScope scope;

        Local<Object>
        obj = Widget::constructor_template->GetFunction ()->NewInstance ();
        obj->SetPointerInInternalField (0, get (name));

        return scope.Close (obj);
    }

private:
    Persistent<Function> callback_;
    Glib::RefPtr<Gtk::Builder> builder_;

/* Not to be implemented */
private:
    BuilderImpl (const BuilderImpl&);
    BuilderImpl& operator= (const BuilderImpl&);

};
} /* clip */

#endif /* end of IMPL_BUILDER_H */
