node-gui
========

node-gui binds GTK+2.0 to node.js, it aims to be perfectly integrated into
node.

What have been done
-------------------

 - A decent C++ framework to (manually) convert GTK+ calls to node calls.
   You can add a new Widget class in less than a dozen lines.
 - GtkBuilder (and glade) is supported.
 - Gtk+ classes can get created and inherited.
 - Complete support for signals and object properties.
 - GTK+ main loop lives very well with node, which means you can use node
   stuff with GTK+ stuff perfectly together.
 - You can manually manage GTK+ Widget's life, just like what you do in C.
 - g_object_new style constructor.

Going through
=============

A simple example
----------------

````javascript
var gui = require ('gui');

var window = new Window ('title', 'node-gui');
window.show ();
````

How it works
------------
First, we should include the module by

````javascript
var gui = require ('gui');
````

Then, all GTK+ widget can be constructed by calling
`new Type (property_name, property_value, ...)`, following codes created
a new Window with `title` set to `node-gui`. All possible properties can
be found at [GTK+ documentation](http://developer.gnome.org/gtk/2.24/GtkWindow.html).

````javascript
var window = new Window ('title', 'node-gui');
````

At last, we call the `show` method of Window. The method's name follows
[GTK+ documentation](http://developer.gnome.org/gtk/2.24/GtkWindow.html),
except that node-gui `camelCase` style.

````javascript
window.show ();
````

Use gui.Builder
---------------

With the help the [Glade](http://glade.gnome.org/), we can design the GUI
in Glade and save the user interfaces as XML, then by using gui.Builder,
the GUI can be dynamically contructed at run time.

Suppose we have an exsisting Glade output file `test.glade`, it includes
a Window naming `window`, then we can use following code to create then
Window from file.

````javascript
var gui = require ('gui');

new gui.Builder('test.glade', function (builder) {
    var window = builder.get ('window', gui.Window);
    window.show ();
});
````

Explaining gui.Builder
----------------------


License
=======

(The MIT License)

Copyright (c) 20011-2012 Zhao Cheng and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

