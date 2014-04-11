var Component = require('./Component');
var VehicleDynamic = require('./VehicleDynamic');
var VehicleConstants = require('./VehicleConstants.js');
var util = require('util');
var _ = require('underscore');

/**
 * NOTE: Exactly two components should connect to this component
 */
var Wheels = module.exports = function(name) {
    Component.call(this, name);

    this.torqueInEventsHandled = 0;
}

util.inherits(Wheels, Component);

// We want the VehicleDynamic style connects to
Wheels.prototype.connectsTo = VehicleDynamic.prototype.connectsTo;

Wheels.prototype._torqueInChangeHandler = function(event) {
    console.log('_torqueInChangeHandler ' + this.name);
    this.torqueInEventsHandled++;
    if (this.torqueInEventsHandled % 2 === 1) {
        this.torqueOut = event;
    } else {
        this.torqueOut += event;
        this.emit('forceOut.change', this._convertTorqueToForce(this.torqueOut));
    }
}

/**
 * Converts the given torque into the force at the wheels
 * @param torque In Nm
 * @returns {number} In N
 * @private
 */
Wheels.prototype._convertTorqueToForce = function(torque) {
    return torque / VehicleConstants.TIRE_RADIUS;
}

/**
 * Converts the given output speed (in m/s) to rpm for the input speed
 * @param outputSpeed In m/s
 */
Wheels.prototype.calculateSpeedIn = function(outputSpeed) {
    this.speedIn = outputSpeed / (2 * VehicleConstants.TIRE_RADIUS * Math.PI ) * 60;
}




