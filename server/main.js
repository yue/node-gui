var Server = require ('./server.js').Server;
var Database = require ('./db.js').Database;
var Session = require ('./session.js');

var db = new Database ();
var server = new Server ();

server.on ('register', function (message) {
    db.users.register (message.ext, function (error) {
        server.register (message.ext, error);
    });
});

server.on ('auth', function (message) {
    db.users.auth (message.ext, function (error, doc) {
        server.auth (message.ext, error, doc);
    });
});

server.on ('session', function (message) {
    db.users.token (message.ext, function (error, doc) {
        // Generate a session object
        var session = Session.generate (message, doc);
        server.session (session, error);
    });
});

server.on ('copy', function (message) {
    // Guard
    if (!message || !message.session || !message.clip)
        return;

    // Get session
    message.session = Session.get (message.session);
    if (!message.session) // TODO tell the client session is outdated
        return;

    // Push the new Clip
    db.users.copy (message);
});

server.on ('logout', function (message) {

});

server.run ();
