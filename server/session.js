var pool = { };

function Session (message, db) {
    this.id = message.clientId;
    this.user = db.user;
    this.token = String (db._id);

    // Login time
    this.time = new Date ();

    pool[this.id] = this;
}

exports.get = function (id) {
    return pool[id];
}

exports.generate = function (message, db) {
    var session = new Session (message, db);
    pool[session.id] = session;

    return session;
}

exports.erase = function (id) {
    delete pool[id];
}
