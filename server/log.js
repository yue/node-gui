function Loggger () {
    this.extension = {
        incoming: function (message, callback) {
            console.log ('[incoming]', message);

            callback (message);
        },

        outgoing: function (message, callback) {
            console.log ('[outgoing]', message);

            callback (message);
        }
    };
}

exports.Loggger = Loggger;
