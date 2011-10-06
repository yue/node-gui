#ifndef IMPL_CHANNEL_H
#define IMPL_CHANNEL_H

#include <memory>
#include <list>
#include <tuple>
#include <functional>

namespace clip {

    template<class N, class G, class MUTEX, class LOCK>
    class Channel {
    public:
        typedef std::function<void ()> Callback;
        typedef std::function<void ()> Task;
        typedef std::tuple<Task /* task */, Callback /* callback */> Job;
        typedef std::list<Job> JobsList;

        enum JOB_TYPE {
            NODE, GUI
        };

        Channel () {
        }

        // Move jobs list out
        template<JOB_TYPE type>
        JobsList move_jobs () {
            JobsList empty_list;
            {
            LOCK lock (get_mutex<type> ());
            get_jobs<type> ().swap (empty_list);
            }

            return std::move (empty_list);
        }

        template<JOB_TYPE type>
        JobsList& get_jobs () {
            return jobs_[type];
        }

        template<JOB_TYPE type>
        MUTEX& get_mutex () {
            return mutex_[type];
        }

        // Init channel
        void init (N *signal) {
            signal_node_.reset (signal);
            emit_node ();
        }
        void init (G *signal) {
            signal_gui_.reset (signal);
            emit_gui ();
        }

        // Push new job to list
        template<JOB_TYPE type>
        void push_job (Task&& task, Callback&& callback = Callback ()) {
            LOCK lock (get_mutex<type> ());
            get_jobs<type> ().push_back (std::move (
                        std::make_tuple (task, callback)));
        }

        // Notifies new jobs
        void emit_node () {
            emit<NODE> (signal_node_);
        }
        void emit_gui () {
            emit<GUI> (signal_gui_);
        }

        template<JOB_TYPE type, class T>
        void emit (T& signal) {
            // Check whether jobs list is empty
            bool empty;
            {
            LOCK lock (get_mutex<type> ());
            empty = get_jobs<type> ().empty ();
            }

            if (!empty && signal)
                signal->emit ();
        }

    private:
        std::unique_ptr<N> signal_node_;
        std::unique_ptr<G> signal_gui_;

        MUTEX mutex_[2];
        JobsList jobs_[2];

    /* Not to be implemented */
    private:
        Channel (const Channel&);
        Channel& operator= (const Channel&);

    };
} /* clip */

#endif /* end of IMPL_CHANNEL_H */
