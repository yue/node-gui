var http = require ('http'),
    faye = require ('faye');

function Protocol (address) {
    this.bayeux = new faye.Client (address);
}

exports.Protocol = Protocol;

Protocol.prototype.subscribe = function (path, call) {
    return this.bayeux.subscribe (path, call);
}

Protocol.prototype.publish = function (path, data) {
    return this.bayeux.publish (path, data);
}

Protocol.prototype.addHook = function (hook) {
    hook.bayeux = this.bayeux;
    this.bayeux.addExtension (hook.extension);
}
