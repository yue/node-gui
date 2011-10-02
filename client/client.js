var EventEmitter = require ('events').EventEmitter;
var Protocol     = require ('./protocol.js').Protocol;
var ClientExt    = require ('./ext.js').ClientExt;

function Client () {
    EventEmitter.call(this);

    // Bayeux protocol implementation
    this.protocol = new Protocol ('http://localhost:8000/faye');

    // Add extension
    this.ext = new ClientExt ();
    this.protocol.addHook (this.ext);
}

require ('util').inherits (Client, EventEmitter);

exports.Client = Client;

Client.prototype.register = function (ext, callback) {
    this.ext._extra = ext;
    this.protocol.subscribe ('/register/' + ext.user, function (message) {
        callback (message);
    });
}
