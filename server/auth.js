function ServerAuth (protocol) {
    // Implement faye's incoming filter
    this.extension = {
        incoming: function (message, callback) {
            // Deal only `/auth` subscribe
            if (message.channel !== '/meta/subscribe' || 
                message.subscription !== '/auth' )
                return callback (message);

            callback (message);

            // Send auth result through `/auth`
            protocol.bayeux.getClient ().publish ('/auth', { "haha":"haha" });
        }
    };
}

exports.ServerAuth = ServerAuth;
