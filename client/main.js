var Client = require ('./client.js').Client;

var client = new Client ();
client.register ({
	user: 'jaja', password: '123'
}, function (message) {
	console.log (message);
});
