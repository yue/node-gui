var ClipAgent = require ('./clip.js').ClipAgent;
var Clipboard = require ('clipboard').Clipboard;

var agent = new ClipAgent ();
var clipboard = new Clipboard ();

//clipboard.paste ('test');

clipboard.on ('copy', function (data) {
    console.log (data);
});

agent.login ('fool', '1234');

agent.on ('login', function () {
	agent.copy ({
		'type': 'text',
		'data': '意外滴到了北津学院一游。意外发现中学同学在这边。'
	});
});

agent.on ('paste', function (clip) {
	console.log (clip);
});

process.on ('SIGINT', exit);

// Hook to clean everything when exiting
function exit () {
	agent.destroy ();

    // Delay exiting to send logout infomation
    setTimeout (function () { process.exit (0); }, 1000);
}
