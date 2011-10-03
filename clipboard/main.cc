#include <clipboard.h>

extern "C" void
init (Handle<Object> target)
{
    HandleScope scope;

    Local<FunctionTemplate> t = FunctionTemplate::New (Clipboard::New);
    t->InstanceTemplate()->SetInternalFieldCount (1);

    NODE_SET_PROTOTYPE_METHOD (t, "paste", Clipboard::Paste);

    target->Set (String::NewSymbol ("Clipboard"), t->GetFunction ());
}
