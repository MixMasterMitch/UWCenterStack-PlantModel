var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Simulator = module.exports = function() {
    EventEmitter.call(this);
};
util.inherits(Simulator, EventEmitter);

/**
 * Marks the start of the simulation.
 *
 * Should be implemented by a child class.
 */
Simulator.prototype.start = function() {};

/**
 * Marks the start of the next time step. Calls to getStepTime will use this new step time.
 *
 * Should be implemented by a child class.
 */
Simulator.prototype.step = function() {};

/**
 * Gets the duration of the current step to the prior step. Use step to refresh the step duration.
 *
 * Should be implemented by a child class.
 */
Simulator.prototype.getStepDuration = function() {};

/**
 * Gets the time into the simulation at the last step. Use step to refresh the step time.
 *
 * Should be implemented by a child class.
 */
Simulator.prototype.getStepTime = function() {};