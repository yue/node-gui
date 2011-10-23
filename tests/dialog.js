var gui = require('../lib/gui');

var dialog = new gui.AboutDialog ();

dialog.setProgramName ('node-gui');
dialog.setLicense ('MIT');
dialog.setVersion ('0.0.1');
dialog.show ();

dialog.on ('delete-event', function () {
    gui.quit ();
});
