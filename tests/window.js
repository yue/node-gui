var gui = require('../lib/gui');

var window = new gui.Window ({
    'title': 'node-gui',
    'window-position': 1,
    'opacity': 0.5
});

window.show ();

window.on ('delete-event', function () {
    gui.quit ();
});
