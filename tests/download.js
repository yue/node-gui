var gui = require ('gui');
var http = require ('http');

new gui.Builder (__dirname + '/download.glade', function (builder) {
    var window   = builder.get ('window'   , gui.Window   ) ;
    var download = builder.get ('download' , gui.Button   ) ;
    var url      = builder.get ('url'      , gui.Entry    ) ;
    var text     = builder.get ('text'     , gui.TextView ) ;

    window.setBorderWidth (10);
    window.show ();

    window.on ('delete-event', function () {
        gui.quit ();
        process.exit (0);
    });

    var onDownload = function () {
        var sUrl  = url.getText ();

        var options = require ('url').parse (sUrl);
        var data = "";
        var req = http.request (options, function (res) {
            res.on ('data', function (chunk) {
                var buffer = text.getBuffer ();
                var str = String (chunk);
                buffer.insertAtCursor (str, str.length);
            });

            res.on ('end', function () {
                download.setSensitive (true);
            });
        });

        req.on ('error', function (e) {
            var message = new gui.MessageDialog ({
                'buttons': 1,
                'text': 'Networking Error',
                'secondary-text': e.message
            });
            message.show ();
            message.on ('response', function () {
                message.destroy ();
            });

            download.setSensitive (true);
        });

        req.on ('response', function () {
            text.getBuffer ().setProperty ('text', '');
        });

        req.end ();

        download.setSensitive (false);
    };

    download.on ('clicked', onDownload);
    url.on ('activate', onDownload);
});
