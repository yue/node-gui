var ClipAgent = require ('./agent.js').ClipAgent;
var gui       = require ('gui');
var options   = require ('./options.js');
var config    = options.config;

var agent = new ClipAgent ();
var clipboard = new gui.Clipboard ();

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
    }
});

agent.on ('login', function () {
    // Remember token after login
    config.token = agent.token;
    options.save ();

    // Begin monitoring clipboard after login
    clipboard.on ('copy', function (data) {
        console.log ('[New Copy]', data);
        agent.copy ({
            'type': 'text',
            'data': data
        });
    });
});

agent.on ('paste', function (clip) {
    console.log ('[New Clip]', clip);
    clipboard.paste (clip.data);
});

agent.on ('error', function (message) {
    console.error (message);
    process.exit (0);
});
