var ClipAgent = require ('./clip.js').ClipAgent;
var Clipboard = require ('clipboard').Clipboard;

var agent = new ClipAgent ();
var clipboard = new Clipboard ();

agent.login ('fool', '1234');

agent.on ('login', function () {
    clipboard.on ('copy', function (data) {
        agent.copy ({
            'type': 'text',
            'data': data
        });
    });
});

agent.on ('paste', function (clip) {
    clipboard.paste (clip.data);
});

process.on ('SIGINT', exit);

// Hook to clean everything when exiting
function exit () {
    agent.destroy ();

    // Delay exiting to send logout infomation
    setTimeout (function () { process.exit (0); }, 1000);
}
