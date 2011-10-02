function ServerProctect (protocol) {
    // Implement faye's incoming filter
    this.extension = {
        incoming: function (message, callback) {
            // Filter /service chancels
            callback (message);
        }
    };
}

exports.ServerProctect = ServerProctect;
