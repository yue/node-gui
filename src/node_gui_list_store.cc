#include "node_gui_list_store.h"
#include <vector>

namespace clip {
Persistent<FunctionTemplate> ListStore::constructor_template;

void ListStore::Init (Handle<v8::Object> target) {
    CREATE_NODE_CONSTRUCTOR_INHERIT ("ListStore", ListStore, Object);

    END_CONSTRUCTOR ();
}

Handle<Value> ListStore::New (const Arguments& args) {
    HandleScope scope;

    WRAP_EXSISTING_OBJECT (ListStore);

    if (args.Length () != 1 || !args[0]->IsArray ())
        return THROW_BAD_ARGS;

    Local<Array> columns = Local<Array>::Cast (args[0]);

    // Push GTypes
    std::vector<GType> types;
    types.reserve (columns->Length ());
    for (size_t i = 0; i < columns->Length (); i++) {
        types.push_back (columns->Get (i)->Int32Value ());
    }

    GtkListStore *store = gtk_list_store_newv (types.size (), types.data ());

    if (store == NULL)
        return NODE_ERROR ("Cannot create ListStore");

    // Wrap it
    args.This ()->SetPointerInInternalField (0, store);
    args.This ()->SetPointerInInternalField (1, nullptr);

    return args.This ();
}
} /* clip */
