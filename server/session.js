var _ = require ('underscore');

var pool = { }; // Store sessions
var users = { }; // Store users (One user may have many sessions)

function Session (info) {
    this.id     = info.id;
    this.user   = info.user;
    this.token  = info.token;
    this.client = info.client;
	this.paste	= null;

    // Login time
    this.time = new Date ();
}

// Return session object by its id
exports.getById = function (id) {
    return pool[id];
}

// Return all sessions under a user
exports.getByUser = function (user) {
	return users[user];
}

// Insert a new session
exports.insert = function (info) {
	// Create session object
    var session = new Session (info);

	// Store it to the pool
    pool[session.id] = session;

	// Append session to corresponding user's clients
	var user = this.getByUser (session.user);
	if (user) {
		user.push (session);
	} else {
		users[session.user] = [ session ];
	}

    return session;
}

// Erase one session
exports.erase = function (session) {
	// Erase from user's session list
	var user = this.getByUser (session.user);
	users[session.user] = _.without (user, session);

	// Erase from pool
    delete pool[session.id];
}
