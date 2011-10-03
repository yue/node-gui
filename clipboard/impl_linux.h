#ifndef IMPL_LINUX_H
#define IMPL_LINUX_H

#include <node.h>
#include <pthread.h>
#include <gtkmm/main.h>
#include <gtkmm/clipboard.h>

class Impl {
public:
    Impl (ev_async *ev);
    virtual ~Impl ();

    void lock () {
        pthread_mutex_lock (&lock_);
    }

    void unlock () {
        pthread_mutex_unlock (&lock_);
    }

    const char *get_data () const {
        // Should lock when read
        return buffer_.c_str ();
    }

private:
    pthread_t handle_;
    pthread_mutex_t lock_;
    Glib::ustring buffer_;
    ev_async *ev_;

    static void *main (void *);
    static void on_changed (GdkEventOwnerChange*, Impl*);
    static void on_received (const Glib::ustring& data, Impl*);

/* Not to be implemented */
private:
    Impl (const Impl&) = delete;
    Impl& operator= (const Impl&) = delete;

};

#endif /* end of IMPL_LINUX_H */
