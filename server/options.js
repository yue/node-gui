var fs = require ('fs');

var config = JSON.parse (fs.readFileSync (__dirname + '/config.js'));

// Random server key
config.key = require ('crypto').createHash ('sha1').update (
                        '' + new Date ().getTime ()).digest ("hex");

exports.config = config;
