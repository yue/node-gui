var http = require('http'),
    faye = require('faye');

var client = new faye.Client('http://localhost:8000/faye');

client.publish('/email/new', {
    text:       'New email has arrived!',
    inboxSize:  34
});

client.subscribe('/auth', function (message) {
    console.log (message);
});
