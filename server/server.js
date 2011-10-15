var dnode  = require ('dnode');
var _      = require ('underscore');
var config = require ('./options.js').config;

var EventEmitter    = require ('events').EventEmitter;

// Transfer client calls to events
function transfer (name) {
    this.emit.apply (this, arguments);
}

function Server () {
    var self = this;
    EventEmitter.call(this);

    // Use dnode protocol
    this.protocol = dnode (function (client, connection) {
        this.register = _.bind (transfer , self , 'register' , client, connection);
        this.auth     = _.bind (transfer , self , 'auth'     , client, connection);
        this.token    = _.bind (transfer , self , 'token'    , client, connection);
        this.copy     = _.bind (transfer , self , 'copy'     , client, connection);

        connection.on ('end', _.bind (transfer, self, 'logout', client, connection));
    });
}

require ('util').inherits (Server, EventEmitter);

exports.Server = Server;

// Run Server! Run!
Server.prototype.run = function () {
    this.protocol.listen (config.listenPort);
    console.log ('Running on localhost:' + config.listenPort);
}
