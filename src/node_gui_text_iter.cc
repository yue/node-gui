#include "node_gui_text_iter.h"

namespace clip {
Persistent<FunctionTemplate> TextIter::constructor_template;

void TextIter::Init (Handle<v8::Object> target) {
    ATTACH_CONSTRUCTOR ("TextIter", TextIter, (New<TextIter, GtkTextIter>));

    GETTER_METHOD (TextIter , "getBuffer"            , gtk_text_iter_get_buffer              , GtkTextBuffer * ) ;
    SIMPLE_METHOD (TextIter , "free"                 , gtk_text_iter_free                                      ) ;
    GETTER_METHOD (TextIter , "getOffset"            , gtk_text_iter_get_offset              , gint            ) ;
    GETTER_METHOD (TextIter , "getLine"              , gtk_text_iter_get_line                , gint            ) ;
    GETTER_METHOD (TextIter , "getLineOffset"        , gtk_text_iter_get_line_offset         , gint            ) ;
    GETTER_METHOD (TextIter , "getLineIndex"         , gtk_text_iter_get_line_index          , gint            ) ;
    GETTER_METHOD (TextIter , "getVisibleLineIndex"  , gtk_text_iter_get_visible_line_index  , gint            ) ;
    GETTER_METHOD (TextIter , "getVisibleLineOffset" , gtk_text_iter_get_visible_line_offset , gint            ) ;
    GETTER_METHOD (TextIter , "getChar"              , gtk_text_iter_get_char                , gunichar        ) ;
    GETTER_METHOD (TextIter , "startsWord"           , gtk_text_iter_starts_word             , gboolean        ) ;
    GETTER_METHOD (TextIter , "endsWord"             , gtk_text_iter_ends_word               , gboolean        ) ;
    GETTER_METHOD (TextIter , "insideWord"           , gtk_text_iter_inside_word             , gboolean        ) ;
    GETTER_METHOD (TextIter , "startsLine"           , gtk_text_iter_starts_line             , gboolean        ) ;
    GETTER_METHOD (TextIter , "endsLine"             , gtk_text_iter_ends_line               , gboolean        ) ;
    GETTER_METHOD (TextIter , "startsSentence"       , gtk_text_iter_starts_sentence         , gboolean        ) ;
    GETTER_METHOD (TextIter , "endsSentence"         , gtk_text_iter_ends_sentence           , gboolean        ) ;
    GETTER_METHOD (TextIter , "insideSentence"       , gtk_text_iter_inside_sentence         , gboolean        ) ;
    GETTER_METHOD (TextIter , "isCursorPosition"     , gtk_text_iter_is_cursor_position      , gboolean        ) ;
    GETTER_METHOD (TextIter , "getCharsInLine"       , gtk_text_iter_get_chars_in_line       , gint            ) ;
    GETTER_METHOD (TextIter , "getBytesInLine"       , gtk_text_iter_get_bytes_in_line       , gint            ) ;
    GETTER_METHOD (TextIter , "isEnd"                , gtk_text_iter_is_end                  , gboolean        ) ;
    GETTER_METHOD (TextIter , "isStart"              , gtk_text_iter_is_start                , gboolean        ) ;
    GETTER_METHOD (TextIter , "forwardChar"          , gtk_text_iter_forward_char            , gboolean        ) ;
    GETTER_METHOD (TextIter , "backwardChar"         , gtk_text_iter_backward_char           , gboolean        ) ;

    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getSlice"        , (GetterMethod<gchar*   , const GtkTextIter * , GtkTextIter , gtk_text_iter_get_slice>         )  ) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getText"         , (GetterMethod<gchar*   , const GtkTextIter * , GtkTextIter , gtk_text_iter_get_text>          )  ) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getVisibleSlice" , (GetterMethod<gchar*   , const GtkTextIter * , GtkTextIter , gtk_text_iter_get_visible_slice> )  ) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "getVisibleText"  , (GetterMethod<gchar*   , const GtkTextIter * , GtkTextIter , gtk_text_iter_get_visible_text>  )  ) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "editable"        , (GetterMethod<gboolean , gboolean            , GtkTextIter , gtk_text_iter_editable>          )  ) ;
    NODE_SET_PROTOTYPE_METHOD (constructor_template , "canInsert"       , (GetterMethod<gboolean , gboolean            , GtkTextIter , gtk_text_iter_can_insert>        )  ) ;

    END_CONSTRUCTOR ();
}
} /* clip */
