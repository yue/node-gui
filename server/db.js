var mongo = require('mongoskin');

function Database () {
    this.db = mongo.db ('localhost:27017/clip?auto_reconnect');

    // Main collections
    this.users = new Collection (this.db, 'users');
}

exports.Database = Database;

Database.prototype.close = function () {
    this.db.close ();
}

function Collection (db, name) {
    this.db = db;
    this.con = db.collection (name);
}

Collection.prototype.register = function (data, success, failure) {
    // Check parameters
    if (!data.user || !data.password) {
        failure ();
    }

    var con = this.con;

    // Find exsiting user
    var cursor = con.find ({ 'user': data.user });
    cursor.nextObject (function (err, doc) {
        if (err != null || doc != null) { // Exsiting one
            failure ();
        } else {
            // Hook creation time (use UNIX timestamp)
            data.create_time = Math.round(new Date().getTime() / 1000);
            // Insert user
            con.insert (data);

            success ();
        }
    });
}
