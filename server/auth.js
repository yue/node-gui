function ServerAuth (server) {
    var messageMap = {
        // `channel name`: `event name`
        'register': 'register'
    };

    // Implement faye's incoming filter
    this.extension = {
        incoming: function (message, callback) {
            console.log (message);
            if (message.channel !== '/meta/subscribe')
                return callback (message);

            // Dispatch requests
            for (channel in messageMap) {
                var prefix = '/' + channel + '/'; // `/register/`

                // Found match
                if (message.subscription.startsWith (prefix)) {
                    console.log (message);
                    // Validate '/register/:user' == message.ext.user
                    if (prefix + message.ext.user != message.subscription)
                        return;

                    // Create channel
                    callback (message);

                    // Notify the creation
                    server.emit (messageMap[channel], message.ext);
                    return;
                }
            }

            // No matches
            callback (message);
        }
    };
}

exports.ServerAuth = ServerAuth;

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
}
