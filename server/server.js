var config         = require ('./options.js').config;

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
    this.protocol.listen (config.listenPort);
}

Server.prototype.register = function (info, flag) {
    var message = {
        'status': 'ok'
    };

    if (flag != 'OK')
        message = {
            'status': 'error',
            'error': flag
        };

    this.protocol.publish ('/register/' + info.user, message);
}

Server.prototype.auth = function (info, error, doc) {
    if (error) {
        var message = {
            'status': 'error',
            'error': error
        };

        this.protocol.publish ('/auth/' + info.user, message);
    } else {
        var message = {
            'status': 'ok',
            'token': doc._id
        };

        this.protocol.publish ('/auth/' + info.user, message);
    }
}

Server.prototype.session = function (session, error) {
    if (error) {
        var message = {
            'status': 'error',
            'error': error
        };

        this.protocol.publish ('/session/' + session.token, message);
    } else {
        var message = {
            'status': 'ok',
            'session': session.id
        };

        this.protocol.publish ('/session/' + session.token, message);
    }
}
