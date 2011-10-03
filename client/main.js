var Client = require ('./client.js').Client;

var client = new Client ();

client.auth ({
    'user': 'fool',
    'password': '1234'
}, function (error, message) {
    if (error == undefined) {
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
        if (error) {
            console.error (error);
        } else {
            testCopy (message.session);
        }
    });
}

function testCopy (session) {
    client.copy (session, {
        'type': 'text',
        'data': 'hahahaha'
    });
}

