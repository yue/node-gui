var _ = require ('underscore');
var config = require ('./options.js').config;

function ServerProctect (server) {
    var channels = ['/copy', '/logout'];

    // Implement faye's incoming filter
    this.extension = {
        incoming: function (message, callback) {
            // Filter private chancels from clients
            if (message.channel == '/meta/subscribe' &&
                _.include (channels, message.subscription) &&
                message.clientId != server.protocol.getClientId ())
                return;

            callback (message);
        }
    };
}

exports.ServerProctect = ServerProctect;
