var config = require ('./options.js').config,
    dnode  = require ('dnode'),
    _      = require ('underscore');

function Client (onPaste, onEnd) {
    var self = this;

    // All jobs will be pushed in before client is ready
    this.jobs_queue = [];

    this.remote = this.connection = null;
    this.protocol = dnode ({
        'paste': _.bind (onPaste, this)
    });
    this.protocol.connect (config.server, config.port, function (remote, connection) {
        self.remote     = remote;
        self.connection = connection

        // Do and clean previous jobs
        for (var i in self.jobs_queue) {
            self.jobs_queue[i] ();
        }
        self.jobs_queue = [];

        connection.on ('end', _.bind (onEnd, self, 'Server disconnected'));
    });
}

exports.Client = Client;

Client.prototype.doJob = function (job) {
    if (this.remote)
        job ();
    else
        this.jobs_queue.push (job);
}

Client.prototype.register = function (user, password, cb) {
    var self = this;

    this.doJob (function () {
        self.remote.register ({
            'user': user,
            'password': password
        }, cb);
    });
}

Client.prototype.auth = function (user, password, cb) {
    var self = this;

    this.doJob (function () {
        self.remote.auth ({
            'user': user,
            'password': password
        }, cb);
    });
}

Client.prototype.token = function (token, cb) {
    var self = this;

    this.doJob (function () {
        self.remote.token ({
            'token': token
        }, cb);
    });
}

Client.prototype.copy = function (clip, cb) {
    // Add decorations here
    clip.time = new Date ();

    var self = this;

    this.doJob (function () {
        // Publish to server
        self.remote.copy ({
            'clip': clip
        }, cb);
    });
}

Client.prototype.logout = function () {
    this.connection.end ();
}
