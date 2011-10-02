var Server = require ('./server.js').Server;
var Database = require ('./db.js').Database;

var db = new Database ();
var server = new Server ();

server.on ('register', function (message) {
    console.log (message);

    /*
    db.users.register ({ user: 'admin3', password: '123' }, function () {
        console.log ('haha');
    });
    */
});

server.run ();
