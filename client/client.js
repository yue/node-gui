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

Client.prototype.publish = function (path, ext, callback) {
    this.ext.set (path, ext);

    var subscription = 
    this.protocol.subscribe (path, function (message) {
        callback (message.error, message);

        subscription.cancel ();
    });

    subscription.errback (function (error) {
        callback ('Connect timout');
    });
}

Client.prototype.register = function (ext, callback) {
    var path = '/register/' + ext.user;
    this.publish (path, ext, callback);
}

Client.prototype.auth = function (ext, callback) {
    var path = '/auth/' + ext.user;
    this.publish (path, ext, callback);
}

Client.prototype.session = function (ext, callback) {
    var path = '/session/' + ext.token;
    this.publish (path, ext, callback);
}
