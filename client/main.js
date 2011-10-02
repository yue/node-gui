var Client = require ('./client.js').Client;

var client = new Client ();

client.register ({
    'user': 'fool',
    'password': '1234'
}, function (error, message) {
    console.error (error, message);
});

client.auth ({
	'user': 'zcbenz',
    'password': '123'
}, function (error, message) {
    if (!error) {
        getSession (message.token);
    }
    else {
        console.error (error);
    }
});

function getSession (token) {
    client.session ({
        'token': token
    }, function (error, message) {
        console.log (error, message);
    });
}

