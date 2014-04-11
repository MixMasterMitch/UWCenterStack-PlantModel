var Component = require('./Component');
var util = require('util');

var Transmission = module.exports = function(name) {
    Component.call(this, name);
}
util.inherits(Transmission, Component);

/**
 * TODO
 * @param inputTorque
 */
Transmission.prototype.calculateSpeedIn = function(outputSpeed) {
    this.speedIn = 8 * outputSpeed;
}

/**
 * TODO
 * @param inputTorque
 */
Transmission.prototype.calculateTorqueOut = function(inputTorque) {
    this.torqueOut = 8 * inputTorque;
}



