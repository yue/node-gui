var config = require ('./options.js').config;

var EventEmitter    = require ('events').EventEmitter;
var Protocol        = require ('./protocol.js').Protocol;

var ServerAuth      = require ('./auth.js').ServerAuth;
var ServerProctect  = require ('./protect.js').ServerProctect;
var ServerLogger    = require ('./log.js').Loggger;
var ServerPasteHook = require ('./paste.js').ServerPasteHook;

function Server () {
    EventEmitter.call(this);

    // Bayeux protocol implementation
    this.protocol = new Protocol ();

    // Add extension for auth
    this.protocol.addHook (new ServerLogger (this));
    this.protocol.addHook (new ServerProctect (this));
    this.protocol.addHook (new ServerAuth (this));
    this.protocol.addHook (new ServerPasteHook (this));
}

require ('util').inherits (Server, EventEmitter);

exports.Server = Server;

// Run Server! Run!
Server.prototype.run = function () {
    var self = this;

    this.protocol.listen (config.listenPort);

    // Setup /copy and /logout channel
    this.protocol.subscribe ('/copy', function (message) {
        self.emit ('copy', message);
    });

    this.protocol.subscribe ('/logout', function (message) {
        self.emit ('logout', message);
    });
}

// Server's unique id
Server.prototype.id = function () {
    return this.protocol.getClientId ();
}

Server.prototype.register = function (info, error) {
    var path = '/register/' + info.user;
    var message = {
        'status': 'ok'
    };

    if (error)
        message = {
            'status': 'error',
            'error': error
        };

    this.protocol.publish (path, message);
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
            'session': session.id,
            'user': session.user
        };

        this.protocol.publish ('/session/' + session.token, message);
    }
}

Server.prototype.paste = function (token, clip) {
    var message = {
        'status': 'ok',
        'clip': clip
    };

    this.protocol.publish ('/paste/' + token, message);
}
