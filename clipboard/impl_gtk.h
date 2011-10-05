#ifndef IMPL_LINUX_H
#define IMPL_LINUX_H

#include <node.h>
#include <thread>
#include <memory>
#include <gtkmm/main.h>
#include <gtkmm/clipboard.h>
#include <glibmm/dispatcher.h>

class Impl {
public:
    Impl (uv_async_t *clip_changed);
    virtual ~Impl ();

    // Set clipboard's data
    void set_data (const char *data);

    // Get clipboard's data
    const char *get_data () const {
        return buffer_.c_str ();
    }

private:
    std::thread thread_;
    std::string buffer_;
    std::string paste_;

    bool i_changed_board_;

    std::unique_ptr<Glib::Dispatcher> signal_paste_;
    std::unique_ptr<Glib::Dispatcher> signal_quit_;

    uv_async_t *clip_changed_;

    void main ();
    void on_changed (GdkEventOwnerChange*);
    void on_received (const Glib::ustring& data);
    void on_paste ();

/* Not to be implemented */
private:
    Impl (const Impl&) = delete;
    Impl& operator= (const Impl&) = delete;

};

#endif /* end of IMPL_LINUX_H */
