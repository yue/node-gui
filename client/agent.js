var Client = require ('./client.js').Client;
var EventEmitter = require ('events').EventEmitter;

function ClipAgent () {
    EventEmitter.call(this);

    this.client  = new Client ();

    this.session = null;
    this.user    = null;
    this.token   = null;
    this.paste   = null;
}
require ('util').inherits (ClipAgent, EventEmitter);

exports.ClipAgent = ClipAgent;

ClipAgent.prototype.register = function (user, password) {
    var self = this;

    this.client.register ({
        'user': user,
        'password': password
    }, function (err, doc) {
        if (err) {
            self.emit ('error', err);
        } else {
            self.user = user;
            self.emit ('register', user);
        }
    });
}

// Login by username and password
ClipAgent.prototype.login = function (user, password) {
    var self = this;

    // First get token
    this.client.auth ({
        'user': user,
        'password': password
    }, function (err, message) {
        if (err) {
            self.emit ('error', err);
        } else {
            self.user = user;

            // Then get session
            self.autoLogin (message.token);
        }
    });
}

// Login by user token
ClipAgent.prototype.autoLogin = function (token) {
    var self = this;
    this.token = token;

    this.client.session ({
        'token': token
    }, function (error, message) {
        if (error) {
            self.emit ('error', error);
        } else {
            self.user = message.user;
            self.session = message.session;
            self._setPasteHook ();

            self.emit ('login');
        }
    });
}

// Subscribe to /paste channel
ClipAgent.prototype._setPasteHook = function () {
    var self = this;

    var subscription = 
    this.client.onPaste (self.token, {
        'session': self.session
    }, function (error, message) {
        if (error) {
            self.emit ('error', error);
        } else {
            // Filter out my own clip
            if (message.clip.author == self.session)
                return;

            self.emit ('paste', message.clip);
        }
    });

    subscription.errback (function (error) {
        self.emit ('error', error);
    });
}

ClipAgent.prototype.copy = function (clip) {
    var self = this;

    this.client.copy ({
        'session': self.session,
        'clip': clip
    });
}

ClipAgent.prototype.logout = function () {
    var self = this;

    this.client.logout ({
        'session': self.session
    });
}

// Clean everything here
ClipAgent.prototype.destroy = function () {
    this.logout ();
}
