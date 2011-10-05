// For using as a module

var EventEmitter = require ('events').EventEmitter;
var Clipboard = require('./gui').Clipboard;

// Keeping `paste` method after inheriance
var paste = Clipboard.prototype.paste;
require ('util').inherits (Clipboard, EventEmitter);
Clipboard.prototype.paste = paste;

exports.Clipboard = Clipboard;
