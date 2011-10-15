var ClipAgent = require ('./agent.js').ClipAgent;
var gui       = require ('gui');
var options   = require ('./options.js');
var config    = options.config;

var agent = new ClipAgent ();
var clipboard = new gui.Clipboard ();

//agent.register('fool', '1234');

// Load GUI
new gui.Builder (__dirname + '/data/clip.glade', function (builder) {
    var window = builder.get ('window', gui.Window);
    window.show ();

    // Load configuration
    if (config.token) {
        // Auto login
        agent.autoLogin (config.token);
    } else if (config.first_time_using) {
        // Prompt for registing
    } else {
        // Prompt for username and password
        agent.login ('fool', '1234');
    }
});

agent.on ('login', function () {
    // Remember token after login
    config.token = agent.token;
    options.save ();

    // Begin monitoring clipboard after login
    var lastClip = null;
    clipboard.on ('copy', function (data) {
        if (lastClip != data) { // Prevent ping-pong
            console.log ('[New Copy]', data);
            agent.copy ({
                'type': 'text',
                'data': data
            });

            lastClip = data;
        }
    });
});

agent.on ('paste', function (clip) {
    console.log ('[New Clip]', clip);

    if (clip)
        clipboard.paste (clip.data);
});

agent.on ('error', function (message) {
    console.error (message);
    process.exit (0);
});

agent.on ('register', function (message) {
    console.log (message);
});
