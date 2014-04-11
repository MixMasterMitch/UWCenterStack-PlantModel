var EventEmitter = require('events').EventEmitter;
var util = require('util');
var _ = require('underscore');

var VehicleDynamic = module.exports = function(name) {
    EventEmitter.call(this);
    this.forceOut = 0; // The total force exerted on the vehicle after this dynamic (N)
    this.speedIn = 0; // The speed of the vehicle (m/s)
    this.name = name;
}
util.inherits(VehicleDynamic, EventEmitter);

/**
 * Effectively says that the output force of this dynamic is
 * the input force of the given dynamic.
 * @param dynamic The dynamic that is connected to this one.
 * @returns {*} The given dynamic. Allows for chaining: dynA.connectsTo(dynB).connectsTo(dynC);
 */
VehicleDynamic.prototype.connectsTo = function(dynamic) {
    this.on('forceOut.change', _.bind(dynamic._forceInChangeHandler, dynamic));
    dynamic.on('speedIn.change', _.bind(this._speedOutChangeHandler, this));
    return dynamic;
}

/**
 * Handles changes to the force of the input to this dynamic
 * @param event Force in N
 * @private
 */
VehicleDynamic.prototype._forceInChangeHandler = function(event) {
    this.calculateForceOut(event);
    this.emit('forceOut.change', this.forceOut);
}

/**
 * Handles changes to the speed of the vehicle
 * @param event Speed in m/s
 * @private
 */
VehicleDynamic.prototype._speedOutChangeHandler = function(event) {
    this.speedIn = event;
    this.emit('speedIn.change', this.speedIn);
}

/**
 * Recalculates the force applied by this dynamic based on the given inputForce from the prior dynamics
 * @param inputForce The force being applied by the prior components and dynamics
 */
VehicleDynamic.prototype.calculateForceOut = function(inputForce) {
    this.torqueOut = inputForce;
}

VehicleDynamic.prototype._setForce = function(torque) {
    this.torqueOut += torque;
    this.emit('forceOut.change', this.torqueOut);
}

VehicleDynamic.prototype._setForce = function(speed) {
    this.speedIn += speed;
    this.emit('speedIn.change', this.speedIn);
}