#ifndef IMPL_SIGNAL_WRAP_H
#define IMPL_SIGNAL_WRAP_H

namespace clip {
class SignalBase {
public:
    SignalBase () { }
    virtual void emit() = 0;

/* Not to be implemented */
private:
    SignalBase (const SignalBase&);
    SignalBase& operator= (const SignalBase&);
};
} /* clip */

#endif /* end of IMPL_SIGNAL_WRAP_H */
