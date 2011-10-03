var crypto = require ('crypto');

// Currently we can't set ext fields in `subscribe`,
// so we store `ext` field in this global map.
var map = {};

function ClientExt () {
    var self = this;

    // Implement faye's outgoing filter
    this.extension = {
        imcoming: function (message, callback) {
            console.log (message);
            callback (message);
        },

        outgoing: function (message, callback) {
            if (message.channel !== '/meta/subscribe') {
                callback (message);
                return;
            }

            // Add ext fields
			if (map[message.subscription]) {
				message.ext = map[message.subscription];

				// hash password automatically
				if (message.ext.password) {
					message.ext.password = 
						crypto.createHash ('sha1').update (
								message.ext.password).digest ("hex");
				}
			}

            callback (message);
        }
    };
}

exports.ClientExt = ClientExt;

ClientExt.prototype.set = function (path, field) {
    map[path] = field;
}

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
}
