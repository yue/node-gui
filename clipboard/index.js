var EventEmitter = require ('events').EventEmitter;
var Clipboard = require('./clipboard').Clipboard;

var paste = Clipboard.prototype.paste;
require ('util').inherits (Clipboard, EventEmitter);
Clipboard.prototype.paste = paste;

exports.Clipboard = Clipboard;
