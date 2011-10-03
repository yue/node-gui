#include "clipboard.h"

extern "C" void
init (Handle<Object> target)
{
    HandleScope scope;

    Clipboard::Init (target);
}
