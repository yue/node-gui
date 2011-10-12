// For using as a module

var gui = require ('./gui');
var EventEmitter = require ('events').EventEmitter;
var Clipboard = gui.Clipboard;

// Keeping `paste` method after inheriance
var paste = Clipboard.prototype.paste;
require ('util').inherits (Clipboard, EventEmitter);
Clipboard.prototype.paste = paste;

exports.ready      = gui.ready;
exports.GType      = gui.GType;
exports.Clipboard  = Clipboard;
exports.Builder    = gui.Builder;
exports.Object     = gui.Object;
exports.Widget     = gui.Widget;
exports.Window     = gui.Window;
exports.StatusIcon = gui.StatusIcon;
