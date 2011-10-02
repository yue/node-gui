var Server = require ('./server.js').Server;
var Database = require ('./db.js').Database;

var db = new Database ();
var server = new Server ();

server.on ('register', function (message) {
    db.users.register (message, function () {
        server.register (message, 'OK');
    }, function (error) {
        server.register (message, error);
    });
});

server.run ();
