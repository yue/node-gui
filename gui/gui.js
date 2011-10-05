// For being embedded in node under Windows

var EventEmitter = require ('events').EventEmitter;
var Clipboard = process.bind ('gui').Clipboard;
 
// Keeping `paste` method after inheriance
var paste = Clipboard.prototype.paste;
require ('util').inherits (Clipboard, EventEmitter);
Clipboard.prototype.paste = paste;

exports.Clipboard = Clipboard;
