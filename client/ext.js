var crypto = require ('crypto');

function ClientExt () {
    var self = this;

    // Implement faye's outgoing filter
    this.extension = {
        outgoing: function (message, callback) {
            if (message.channel !== '/meta/subscribe')
                return callback (message);

            // Add ext fields
            message.ext = self._extra;

            // hash password automatically
            if (message.ext.password) {
                message.ext.password = 
                    crypto.createHash ('sha1').update (
                            message.ext.password).digest ("hex");
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
