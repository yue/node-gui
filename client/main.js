var ClipAgent = require ('./clip.js').ClipAgent;

var agent = new ClipAgent ();

agent.login ('fool', '1234');

agent.on ('login', function () {
	agent.copy ({
		'type': 'text',
		'data': '意外滴到了北津学院一游。意外发现中学同学在这边。'
	});
});

process.on ('exit', onExit);
process.on ('SIGINT', function () { process.exit (0); });

// Hook to clean everything when exiting
function onExit () {
	agent.destroy ();
}
