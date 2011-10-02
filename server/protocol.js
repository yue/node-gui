var http = require ('http'),
    faye = require ('faye');

function Protocol () {
    this.bayeux = new faye.NodeAdapter ({ mount: '/faye', timeout: 45 });
}

exports.Protocol = Protocol;

Protocol.prototype.listen = function (port) {
    if (!port) port = 8000;
    this.bayeux.listen (port);
}

Protocol.prototype.subscribe = function (path, call) {
    this.bayeux.getClient ().subscribe (path, call);
}

Protocol.prototype.publish = function (path) {
    this.bayeux.getClient ().publish (path);
}

Protocol.prototype.addHook = function (hook) {
    hook.bayeux = this.bayeux;
    this.bayeux.addExtension (hook.extension);
}
