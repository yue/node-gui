function ServerAuth (server) {
    var messageMap = {
        // `channel name`: `event name`
        'register': 'register',
        'auth': 'auth',
        'session': 'session'
    };

    // Implement faye's incoming filter
    this.extension = {
        incoming: function (message, callback) {
            if (message.channel !== '/meta/subscribe')
                return callback (message);

            // Dispatch requests
            for (channel in messageMap) {
                var prefix = '/' + channel + '/'; // `/register/`

                // Found match
                if (message.subscription.startsWith (prefix)) {
                    // Validate '/register/:user' == message.ext.user
                    prefix = message.ext.user ? 
                        prefix + message.ext.user : 
                        prefix + message.ext.token;
                    if (prefix!= message.subscription)
                        return;

                    // Create channel
                    callback (message);

                    // Notify the creation
                    server.emit (messageMap[channel], message);
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
