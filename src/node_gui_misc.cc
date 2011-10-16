#include "node_gui_misc.h"

namespace clip {
Persistent<FunctionTemplate> Misc::constructor_template;

void Misc::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Misc", Misc, Widget, misc);

    NODE_SET_PROTOTYPE_METHOD (constructor_template, "setAlignment", (SetterMethod<gfloat, gfloat, GtkMisc, gtk_misc_set_alignment>));
    NODE_SET_PROTOTYPE_METHOD (constructor_template, "setPadding", (SetterMethod<gint, gint, GtkMisc, gtk_misc_set_padding>));

    END_CONSTRUCTOR ();
}
} /* clip */
