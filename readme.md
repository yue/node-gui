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

Tutorial
========

A simple example
----------------

````javascript
var gui = require ('gui');

var window = new gui.Window ('title', 'node-gui');
window.show ();
````

How it works
------------
First, we should include the module

````javascript
var gui = require ('gui');
````

Then, all GTK+ widgets can be constructed by calling
`new Type (property_name, property, property_name, property, ...)`, following codes created
a new Window with `title` set to `node-gui`. All possible properties can
be found at [GTK+ documentation](http://developer.gnome.org/gtk/2.24/GtkWindow.html).

````javascript
var window = new gui.Window ('title', 'node-gui');
````

At last, we call the `show` method of Window. The method's name follows
[GTK+ documentation](http://developer.gnome.org/gtk/2.24/GtkWindow.html),
except that node-gui use `camelCase` style.

````javascript
window.show ();
````

Use gui.Builder
---------------

With the help the [Glade](http://glade.gnome.org/), we can design the GUI
in Glade and save the user interfaces as XML, then by using gui.Builder,
the GUI can be dynamically contructed at run time.

Suppose we have an existing Glade output file `test.glade`, it includes
a Window naming `window`, then we can use following code to create the
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

The constructor of gui.Builder is 

````javascript
new Builder ('/path/to/glade/file', callBackWhenDone);
````

`gui.Builder` will read from `'/path/to/glade/file'` and then use GtkBuilder
to create all objects and widgets from the file. After the construction,
`callBackWhenDone` will be called and the `gui.Builder` instance 
will be passed as the first argument.

In the `callBackWhenDone`, you can use `gui.Builder.get ('name', Type)` to 
receive the actual object, object's type will be determined by the `Type`
argument. The `name` is specified by Glade software.

For example, following calls are legal, because `window` is both a gui.Window
and a gui.Widget according to the object hierarchy:

````javascript
var window = builder.get ('window', gui.Window);
    window = builder.get ('window', gui.Widget);
    window = builder.get ('window', gui.Object);
````

`gui.Builder` will hold all object's life except for toplevel windows.
When you call `builder.destroy ()`, all objects you got by
`builder.get (...)` will be destroyed, except that all `gui.Window` widgets
will live. You must call `window.destroy ()` to destroy all toplevel
windows.

So a complete example will be

````javascript
var gui = require ('gui');

new gui.Builder('test.glade', function (builder) {
    var window = builder.get ('window1', gui.Window);
    var menu = builder.get ('menu1', gui.Menu);
    var button = builder.get ('button1', gui.Button);
    var label = builder.get ('label1', gui.Label);

    window.show ();

    builder.destroy ();
    window.destroy ();
});
````

Signals
-------

GTK+'s signals are similar to node's events, signals will be emited when
there is new user interface events.

Usage of signals is the same with EventEmitter, by calling
`on ('signal-name', callback)`, you will bind `callback` to the specified
signal.

Example of combining menu and tray icon
---------------------------------------

Following example will show a `gui.StatusIcon` on your system tray (or 
notification area. Right clicks on the icon will show a menu.

````javascript
var gui = require ('gui');

new gui.Builder('clip.glade', function (builder) {
    var menu = builder.get ('menu', gui.Menu);

    var tray = new gui.StatusIcon ('title', 'haha');
    tray.setFromFile ('clip.png');
    tray.on ('activate', function () {
        console.log ('left click');
    }
    tray.on ('popup-menu', function (button, activate_time) {
        menu.popup (tray, button, activate_time);
    });
});
````

First we create a `gui.StatusIcon` with property `title` set to `haha`,
and then we set its icon:

````javascript
var tray = new gui.StatusIcon ('title', 'haha');
tray.setFromFile ('clip.png');
````

The left-clicking events's signal name is `activate`, the right-clicking
events's signal name is `popup-menu`. `popup-menu` will pass the the 
button that was pressed and the timestamp of the event that triggered
the signal emission. Then by calling `menu.popup` we can show the menu:

````javascript
tray.on ('popup-menu', function (button, activate_time) {
    menu.popup (tray, button, activate_time);
});
````

Properties
----------

All objects have properties, you can use `setProperty` and `getProperty`
to set/get an object's property.

````javascript
widget.setProperty ('has-focus', true);
widget.setProperty ('title', 'a long text');
````

Each type's available properties can be found at GTK+ documentation.

What's more
-----------

Currently I don't have time to write all the documentation of all widgets,
if you want to use a widget, you need to consult the GTK+ documentation and
`node-gui`'s source code.

Following widgets have been mostly supported now:

In order to use other widgets, you must either help finish its bindings
(A class may take half an hour), or just use it as a normal GTK+ object, 
which has full support of properties and signals.

License
=======

(The MIT License)

Copyright (c) 2011-2012 Zhao Cheng and contributors

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

