var Protocol = require ('./protocol.js').Protocol,
    ServerAuth = require ('./auth.js').ServerAuth;

function Server () {
    this.protocol = new Protocol ();

    // Add extension for auth
    this.protocol.addHook (new ServerAuth (this.protocol));
}

exports.Server = Server;

Server.prototype.run = function () {
    this.protocol.listen (8000);

    this.protocol.subscribe ('/email/new', function (mail) {
        console.log (mail);
    });
}
