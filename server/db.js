var config = require ('./options.js').config;
var mongo = require ('mongoskin');

// TODO
// check database error and report and recover

function Database () {
    this.db = mongo.db (config.database);

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

Collection.prototype.register = function (data, callback) {
    // Check parameters
    if (!data.user || !data.password) {
        callback ('Invalid arguments');
    }

    var con = this.con;

    // Find exsiting user
    con.findOne ({
        'user': data.user
    }, function (err, doc) {
        if (err != null || doc != null) { // Exsiting one
            callback ('User already exists');
        } else {
            // Hook creation time (use UNIX timestamp)
            data.create_time = new Date ();

            // Preserve fixed array of clips
            data.clips = [];
            for (var i = 0; i < 10; i++) {
                data.clips.push (i);
            }

            // encrypt
            data.password = encryptPassword (data.password);

            // Insert user
            con.insert (data);

            callback ();
        }
    });
}

Collection.prototype.auth = function (data, callback) {
    // Check parameters
    if (!data.user || !data.password) {
        callback ('Invalid arguments');
    }

    // Find exsiting user
    this.con.findOne ({
        'user': data.user,
        'password': encryptPassword (data.password)
    }, function (err, doc) {
        if (err == null && doc != null) { // Exsiting one
            callback (undefined, doc);
        } else {
            callback ('User not found');
        }
    });
}

// Return item by id
Collection.prototype.token = function (message, callback) {
    this.con.findById (message.token, function (err, doc) {
        console.log (err, doc);
        if (err == null && doc != null) {
            callback (undefined, doc);
        } else {
            callback ('User not found');
        }
    });
}

// Add a new Clip
Collection.prototype.copy = function (message, callback) {
    var clip = {
        'type': message.clip.type,
        'time': message.clip.time,
        'data': message.clip.data
    };

    // Pop oldest clip
    this.con.updateById (message.session.token, {
        '$pop': { 'clips': -1 }
    }, function (err, doc) {
    });

    // Push new clip
    this.con.updateById (message.session.token, {
        '$push': { 'clips': clip }
    }, function (err, doc) {
    });
}

Collection.prototype.lastClip = function (token, callback) {
    this.con.findById (token, {
        'clips': { '$slice': -1 }
    }, function (err, doc) {
        if (!err && doc.clips[0] != null)
            callback (doc.clips[0]);
    });
}

function encryptPassword (password) {
    return require ('crypto').createHash ('sha1').
        update (password).digest ("hex");
}

