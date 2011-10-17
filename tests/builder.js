var gui = require('gui');

new gui.Builder ('./builder.glade', function (builder) {
    var window = builder.get ('window1'   , gui.Window) ;
    var text   = builder.get ('textview1' , gui.Widget) ;
    var label  = builder.get ('label1'    , gui.Label ) ;
    var button = builder.get ('button1'   , gui.Button) ;

    label.setLabel ('Please enter some text');
    window.setProperty ('window-position', 1);
    window.setTitle ('node-gui');
    window.show ();

    text.on ('move-cursor', function (step, count) {
        label.setLabel ('move-cursor: step ' + step + ' count ' + count);
    });

    text.on ('select-all', function () {
        label.setLabel ('select-all');
    });

    button.on ('clicked', function () {
        label.setLabel ('clicked');
    });

    window.on ('delete-event', function () {
        gui.quit ();
    });
});
