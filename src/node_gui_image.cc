#include "node_gui_image.h"

namespace clip {
Persistent<FunctionTemplate> Image::constructor_template;

void Image::Init (Handle<v8::Object> target) {
    CREATE_CUSTOM_NODE_CONSTRUCTOR ("Image", Image, Misc, image);

    SIMPLE_METHOD (Image , "clear"        , gtk_image_clear                         ) ;
    GETTER_METHOD (Image , "getPixbuf"    , gtk_image_get_pixbuf     , GdkPixbuf*   ) ;
    GETTER_METHOD (Image , "getPixelSize" , gtk_image_get_pixel_size , gint         ) ;
    SETTER_METHOD (Image , "setPixelSize" , gtk_image_set_pixel_size , gint         ) ;
    SETTER_METHOD (Image , "setFromFile"  , gtk_image_set_from_file  , const gchar* ) ;

    END_CONSTRUCTOR ();
}
} /* clip */
