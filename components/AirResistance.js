var VehicleDynamic = require('./VehicleDynamic');
var VehicleConstants = require('./VehicleConstants.js');
var util = require('util');

var AirResistance = module.exports = function(name) {
    VehicleDynamic.call(this, name);
}
util.inherits(AirResistance, VehicleDynamic);

/**
 * Uses the Air Resistance equations to calculate the force: F = c 1/2 ρ v2 A
 */
AirResistance.prototype.calculateForceOut = function(inputForce) {
    var force = VehicleConstants.AIR_DRAG_COEFF * VehicleConstants.AIR_DENSITY * VehicleConstants.FRONTAL_AREA * Math.pow(this.speedIn, 2) / 2; // F = c 1/2 ρ v2 A
    if (this.speedIn > 0) {
        this.forceOut = inputForce - force;
    } else {
        this.forceOut = inputForce + force;
    }
}



