var VehicleDynamic = require('./VehicleDynamic');
var VehicleConstants = require('./VehicleConstants.js');
var util = require('util');

var SPEED_THRESHOLD = 0.005;

var RollingResistance = module.exports = function(name) {
    VehicleDynamic.call(this, name);
}
util.inherits(RollingResistance, VehicleDynamic);

/**
 * When the vehicle is moving forward the full negative resistance is applied.
 * When the vehicle is moving backward the full positive resistance is applied.
 * When the vehicle is not moving, but a positive force is applied, the negative resistance is applied up to the positive force.
 * When the vehicle is not moving, but a negative force is applied, the positive resistance is applied up to the negative force.
 */
RollingResistance.prototype.calculateForceOut = function(inputForce) {
    if (this.speedIn > SPEED_THRESHOLD) {
        this.forceOut = inputForce - VehicleConstants.ROLLING_COEFF * VehicleConstants.VEHICLE_DOWN_FORCE;
    } else if (this.speedIn < -SPEED_THRESHOLD) {
        this.forceOut = inputForce + VehicleConstants.ROLLING_COEFF * VehicleConstants.VEHICLE_DOWN_FORCE;
    } else if (inputForce > 0) {
        this.forceOut = Math.max(inputForce - VehicleConstants.ROLLING_COEFF * VehicleConstants.VEHICLE_DOWN_FORCE, 0);
    } else if (inputForce < 0) {
        this.forceOut = Math.min(inputForce + VehicleConstants.ROLLING_COEFF * VehicleConstants.VEHICLE_DOWN_FORCE, 0);
    }
}



