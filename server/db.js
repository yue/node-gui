var _ = require ('underscore');
var mongo = require ('mongoskin');
var config = require ('./options.js').config;

function Database () {
    this.db = mongo.db (config.database);

    // Main collections
    this.users = new Collection (this, 'users');
}

exports.Database = Database;

Database.prototype.close = function () {
    this.db.close ();
}

function Collection (db, name) {
    this.db   = db;
    this.con  = db.db.collection (name);
}

Collection.prototype.register = function (user, password, cb) {
    var self = this;

    // Find exsiting user
    this.con.findOne ({
        'user': user
    }, function (err, doc) {
        // Database panic
        if (err != null) {
            cb ('There is a error in database, please check later');
            console.error ('[Database] ' + err);

            return;
        }

        if (doc != null) { // Exsiting one
            cb ('User already exists');
        } else {
            var data = {
                'user'     : user     , 
                'password' : password , 
                'clips'    : []       , 

                // Hook creation time
                'create_time': new Date ()
            };

            // Preserve fixed array of clips
            for (var i = 0; i < 10; i++) {
                data.clips.push (null);
            }

            // encrypt
            data.password = encryptPassword (data.password);

            // Insert user
            self.con.insert (data, function (err) {
                if (err) {
                    cb ('There is a error in database, please check later');
                    console.error ('[Database] ' + err);

                    return;
                }

                cb (undefined);
            });
        }
    });
}

Collection.prototype.auth = function (user, password, cb) {
    var self = this;

    // Find exsiting user
    this.con.findOne ({
        'user': user,
        'password': encryptPassword (password)
    }, function (err, doc) {
        // Database panic
        if (err != null) {
            cb ('There is a error in database, please check later');
            console.error ('[Database] ' + err);

            return;
        }

        if (doc == null) {
            cb ('User not found');
            return;
        }

        cb (undefined, doc);
    });
}

// Return item by id
Collection.prototype.token = function (token, cb) {
    var self = this;

    this.con.findById (token, function (err, doc) {
        // Database panic
        if (err != null) {
            cb ('There is a error in database, please check later');
            console.error ('[Database] ' + err);

            return;
        }

        if (doc == null) {
            cb ('User not found');
            return;
        }

        cb (undefined, doc);
    });
}

// Add a new Clip
Collection.prototype.copy = function (clip, id, cb) {
    var self = this;
    var clip = {
        'type': clip.type,
        'time': clip.time,
        'data': clip.data
    };

    // Pop oldest clip
    this.con.updateById (id, {
        '$pop': { 'clips': -1 }
    }, function (err, doc) {
        if (err != null) {
            console.error ('[Database] ' + err);
        }
    });

    // Push new clip
    this.con.updateById (id, {
        '$push': { 'clips': clip }
    }, function (err) {
        if (err != null) {
            console.error ('[Database] ' + err);
        }

        cb (err);
    });
}

Collection.prototype.lastClip = function (token, cb) {
    var self = this;

    this.con.findById (token, function (err, doc) {
        if (err != null) {
            console.error ('[Database] ' + err);
            return;
        }

        if (doc) {
            var last = _.last (doc.clips);
            cb (last);
            return;
        }

        cb (null);
    });
}

function encryptPassword (password) {
    return require ('crypto').createHash ('sha1').
        update (password).digest ("hex");
}
