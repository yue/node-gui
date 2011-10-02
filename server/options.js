var fs = require ('fs');

var config = JSON.parse (fs.readFileSync (__dirname + '/config.js'));

exports.config = config;
