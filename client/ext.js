function ClientExt () {
    var self = this;

    // Implement faye's outgoing filter
    this.extension = {
        outgoing: function (message, callback) {
            if (message.channel !== '/meta/subscribe')
                return callback (message);

            // Add ext fields
            if (message.subscription.startsWith ('/register/')) {
                message.ext = self._extra;
            }

            // No matches
            callback (message);
        }
    };
}

exports.ClientExt = ClientExt;

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
}
