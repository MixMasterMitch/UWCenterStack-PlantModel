var Component = require('./Component');
var util = require('util');

var Engine = module.exports = function(name) {
    Component.call(this, name);
}
util.inherits(Engine, Component);

/**
 * For all intents and purposes an engine has the same speed at the input and output
 * but it doesn't really have an input.
 */
Engine.prototype.calculateSpeedIn = function(outputSpeed) {
    this.speedIn = outputSpeed;
}

/**
 * TODO
 */
Engine.prototype.calculateTorqueOut = function() {
    this.torqueOut = 1.5 * this.pedalPos;
}

/**
 * An engine can't have a change on input torque.
 */
Engine.prototype._torqueInChangeHandler = function() {}


Engine.prototype.setAccelPedalPosition = function(pedalPosition) {
    this.pedalPos = pedalPosition;
    this.calculateTorqueOut();
    this.emit('torqueOut.change', this.torqueOut);
}


