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
        if (error) {
            // TODO
            // tell user of invalid token
        } else {
            // Generate a session object
            var session = Session.generate (message, doc);
            server.session (session, error);
        }
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

    // Mark out the author (so the author can filter his own clip)
    message.clip.author = message.session.id;

    // Dispatch the new clip
    server.paste (message.session.token, message.clip);
});

// Send last clip to newly client
server.on ('client', function (session) {
    var session = Session.get (session);
    if (!session)
        return;

    db.users.lastClip (session.token, function (clip) {
        server.paste (session.token, clip);
    });
});

server.on ('logout', function (message) {
    Session.erase (message.session);
});

server.run ();
