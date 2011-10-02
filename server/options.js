var fs = require ('fs');

var config = JSON.parse (fs.readFileSync ('./config.js'));

exports.config = config;
