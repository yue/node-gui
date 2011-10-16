# node-gui

node-gui binds GTK+2.0 to node.js, it aims to be perfectly integrated into
node.

## What have been done

 - A decent C++ framework to (manually) convert GTK+ calls to node calls.
   You can add a new Widget class in less than a dozen lines.
 - GtkBuilder (and glade) is supported.
 - Gtk+ classes can get created and inherited.
 - Complete support for signals and object properties.
 - GTK+ main loop lives very well with node, which means you can use node
   stuff with GTK+ stuff perfectly together.
 - You can manually manage GTK+ Widget's life, just like what you do in C.
 - g_object_new style constructor.
