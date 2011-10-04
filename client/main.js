var ClipAgent = require ('./clip.js').ClipAgent;
var Clipboard = require ('clipboard').Clipboard;

var agent = new ClipAgent ();
var clipboard = new Clipboard ();

clipboard.on ('copy', function (data) {
    console.log (data);
});

agent.login ('fool', '1234');

agent.on ('login', function () {
	agent.copy ({
		'type': 'text',
		'data': 'Multithreading in C++0x part 3: Starting Threads with Member Functions and Reference Arguments'
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
