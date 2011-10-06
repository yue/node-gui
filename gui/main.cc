#include "node_clipboard.h"

extern "C" void
init (Handle<Object> target)
{
    HandleScope scope;

    clip::Clipboard::Init (target);
}
