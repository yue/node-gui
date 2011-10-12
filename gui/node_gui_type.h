#ifndef NODE_GUI_TYPE_H
#define NODE_GUI_TYPE_H

#include <node.h>

namespace clip {
class Type {
public:
    static void Init (v8::Handle<v8::Object> target);

/* Not to be implemented */
private:
    Type (const Type&);
    Type& operator= (const Type&);
};
} /* clip */

#endif /* end of NODE_GUI_TYPE_H */
