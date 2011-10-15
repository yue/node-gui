var _        = require ('underscore');
var Server   = require ('./server.js').Server;
var Database = require ('./db.js').Database;
var Session  = require ('./session.js');

var log    = require ('./log.js').log;
var db     = new Database ();
var server = new Server ();

// Register new user
server.on ('register', function (client, connection, message, cb) {
    if (!message.user || !message.password) {
        cb ('Invalid arguments, missing username and password');
    }

    // Append to database
    db.users.register (message.user, message.password, function (err) {
        log ('register', err);

        // Tell the user of result
        cb (err);
    });
});

// Authencate username and password pair 
server.on ('auth', function (client, connection, message, cb) {
    if (!message.user || !message.password) {
        cb ('Invalid arguments, missing username and password');
    }

    // Check the database
    db.users.auth (message.user, message.password, function (err, doc) {
        log ('auth', err, doc);

        // Tell the user of result
        cb (err, err ? undefined : { 'token': doc._id });
    });
});

// User give us its token, and we return the session id
server.on ('token', function (client, connection, message, cb) {
    if (!message.token) {
        cb ('Invalid arguments, missing user token');
    }

    // Check the database
    db.users.token (message.token, function (err, doc) {
        log ('token', err, doc);

        if (err) {
            cb (err);
            return;
        }

        // Store new session
        var info = {
            id     : connection.id    , 
            token  : String (doc._id) , 
            user   : doc.user         , 
            client : client
        };

        var s = Session.insert (info);

        // Send new session's id to the user
        cb (undefined, { 'session': s.id, 'user': s.user });
        
        // And send the user of newest clip
        db.users.lastClip (s.token, function (clip) {
            if (!client.paste) {
                console.error ('[Paste] Unable to call paste of client', client);
                return;
            }

            if (clip)
                client.paste (clip);
        });
    });
});

// Use sent a new clip
server.on ('copy', function (client, connection, message, cb) {
    // Guard
    if (!message.clip)
        return;

    // Get session
    var s = Session.getById (connection.id);
    if (!s) {
        // Tell the client session is outdated
        cb ('Invalid session');
    }

    // Push the new Clip
    db.users.copy (message.clip, s.token, function (err) {
        log ('copy', err);
        cb (err);
    });

    // Dispatch the new clip
    _.each (Session.getByUser (s.user), function (session) {
        if (session.id != s.id) { // Avoid self ping pong
            session.client.paste (message.clip);
        }
    });
});

// User's connection is ended
server.on ('logout', function (client, connection) {
    var s = Session.getById (connection.id);
    if (s)
        Session.erase (s);
});

server.run ();

process.on ('uncaughtException',function(error){
    console.error ('[Critical]', error);
});
