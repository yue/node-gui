#ifndef IMPL_WIDGET_GTK_H
#define IMPL_WIDGET_GTK_H

#include <gtkmm/widget.h>
#include <node.h>

namespace clip {
class WidgetImpl {
public:
    // Just store the pointer we get, don't delete it on destructor
    WidgetImpl (v8::Handle<Value> external) :
        handle_ (static_cast<Gtk::Widget*> (v8::External::Unwrap (external)))
    { }

    void show () {
        handle_->show_all ();
    }

    void destroy () {
        delete handle_;
        handle_ = nullptr;
    }

private:
    Gtk::Widget *handle_;

/* Not to be implemented */
private:
    WidgetImpl (const WidgetImpl&);
    WidgetImpl& operator= (const WidgetImpl&);

};
} /* clip */

#endif /* end of IMPL_WIDGET_GTK_H */
