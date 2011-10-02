var EventEmitter   = require ('events').EventEmitter;
var Protocol       = require ('./protocol.js').Protocol;

var ServerAuth     = require ('./auth.js').ServerAuth;
var ServerProctect = require ('./protect.js').ServerProctect;

function Server () {
    EventEmitter.call(this);

    // Bayeux protocol implementation
    this.protocol = new Protocol ();

    // Add extension for auth
    this.protocol.addHook (new ServerProctect (this));
    this.protocol.addHook (new ServerAuth (this));
}

require ('util').inherits (Server, EventEmitter);

exports.Server = Server;

// Run Server! Run!
Server.prototype.run = function () {
    this.protocol.listen (8000);

    this.protocol.subscribe ('/register/test',  function (back) {

    });
}
