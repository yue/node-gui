var fs = require ('fs');
var _ = require ('underscore');

// Path of config file, current just in this dir
var path = __dirname + '/config.js';

var config = JSON.parse (fs.readFileSync (path));

exports.config = config;

exports.save = function () {
    fs.writeFileSync (path, JSON.stringify (config));
}
