var EventEmitter = require('events').EventEmitter;
var util = require('util');
var _ = require('underscore');

var Component = module.exports = function(name) {
    EventEmitter.call(this);
    this.torqueOut = 0; // The torque on the output shaft
    this.speedIn = 0; // The speed on the input shaft
    this.name = name;
}
util.inherits(Component, EventEmitter);

/**
 * Effectively says that the output shaft of this component is
 * the input shaft of the given component.
 * @param component The component that is connected to this one.
 * @returns {*} The given component. Allows for chaining: compA.connectsTo(compB).connectsTo(compC);
 */
Component.prototype.connectsTo = function(component) {
    this.on('torqueOut.change', _.bind(component._torqueInChangeHandler, component));
    component.on('speedIn.change', _.bind(this._speedOutChangeHandler, this));
    return component;
}

/**
 * Handles changes to the torque of the input shaft of this component
 * @param event Torque in Nm
 * @private
 */
Component.prototype._torqueInChangeHandler = function(event) {
    this.calculateTorqueOut(event);
    this.emit('torqueOut.change', this.torqueOut);
}

/**
 * Handles changes to the speed of the output shaft of this component
 * @param event Speed in rpm
 * @private
 */
Component.prototype._speedOutChangeHandler = function(event) {
    this.calculateSpeedIn(event);
    this.emit('speedIn.change', this.speedIn);
}

/**
 * Recalculates the speed of the input shaft based on the current
 * output shaft torque and the given output shaft speed.
 * @param outputSpeed The speed of the output shaft of this component
 */
Component.prototype.calculateSpeedIn = function(outputSpeed) {
    this.speedIn = outputSpeed;
}

/**
 * Recalculates the torque applied to the output shaft based on the current
 * input shaft speed and the given input shaft torque.
 * @param inputTorque The torque being applied to the input of this component
 */
Component.prototype.calculateTorqueOut = function(inputTorque) {
    this.torqueOut = inputTorque;
}

Component.prototype._setTorque = function(torque) {
    this.torqueOut += torque;
    this.emit('torqueOut.change', this.torqueOut);
}

Component.prototype._setSpeed = function(speed) {
    this.speedIn += speed;
    this.emit('speedIn.change', this.speedIn);
}