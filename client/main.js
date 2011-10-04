var ClipAgent = require ('./clip.js').ClipAgent;
var Clipboard = require ('clipboard').Clipboard;

var agent = new ClipAgent ();
var clipboard = new Clipboard ();

clipboard.paste ('test');

clipboard.on ('copy', function (data) {
    console.log (data);
});

setTimeout (function () {
    clipboard.paste ('新浪微博对网络异常的处理几乎为0。刷新微博的途中，如果网络中断了，它还在那里转啊转。');
}, 2000);

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
