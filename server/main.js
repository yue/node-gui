var Server = require ('./server.js').Server;
var Database = require ('./db.js').Database;
var Session = require ('./session.js');

var db = new Database ();
var server = new Server ();

server.on ('register', function (message) {
    db.users.register (message.ext, function (error) {
        server.register (message.ext, error ? error : 'OK');
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

server.run ();
