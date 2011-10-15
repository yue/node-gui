var Client       = require ('./client.js').Client,
    EventEmitter = require ('events').EventEmitter,
    _            = require ('underscore');

function transfer (name) {
    this.emit.apply (this, arguments);
}

function ClipAgent () {
    EventEmitter.call(this);

    this.client  = new Client (_.bind (transfer, this, 'paste'),
                               _.bind (transfer, this, 'error'));

    this.session = null;
    this.user    = null;
    this.token   = null;
    this.paste   = null;
}
require ('util').inherits (ClipAgent, EventEmitter);

exports.ClipAgent = ClipAgent;

ClipAgent.prototype.register = function (user, password) {
    var self = this;

    this.client.register (user, password, function (err, doc) {
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
    this.client.auth (user, password, function (err, message) {
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

    this.client.token (token, function (err, message) {
        if (err) {
            self.emit ('error', err);
        } else {
            self.user = message.user;
            self.session = message.session;

            self.emit ('login');
        }
    });
}

ClipAgent.prototype.copy = function (clip) {
    var self = this;

    this.client.copy (clip, function (err) {
        if (err) {
            self.emit ('error', err);
        }
    });
}

ClipAgent.prototype.logout = function () {
    var self = this;

    this.client.logout ();
}
