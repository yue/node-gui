var config = require ('./options.js').config;

function ServerPasteHook (server) {
    var channels = ['/copy', '/logout'];

    // Implement faye's incoming filter
    this.extension = {
        incoming: function (message, callback) {
            callback (message);

            // Creation of /paste means new client is fully ok now
            if (message.channel == '/meta/subscribe' &&
                message.subscription.startsWith ('/paste/')) {
                server.emit ('client', message.clientId);
                return;
            }
        }
    };
}

exports.ServerPasteHook = ServerPasteHook;

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
}
