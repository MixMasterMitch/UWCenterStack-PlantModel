var Simulator = require('./Simulator');
var util = require('util');
var moment = require('moment');

var RealtimeSimulator = module.exports = function() {
    Simulator.call(this);
}
util.inherits(RealtimeSimulator, Simulator);

/**
 * Marks the start of the simulation.
 *
 * Should be implemented by a child class.
 */
RealtimeSimulator.prototype.start = function() {
    this.start = moment();
    this.currentStep = moment();
    this.step();
    return this;
};

/**
 * Marks the start of the next time step. Calls to getStepTime will use this new step time.
 *
 * Should be implemented by a child class.
 */
RealtimeSimulator.prototype.step = function() {
    this.stepDuration = moment().diff(this.currentStep);
    this.currentStep = moment();
    return this;
};

/**
 * Gets the duration of the current step to the prior step. Use step to refresh the step duration.
 *
 * Should be implemented by a child class.
 */
RealtimeSimulator.prototype.getStepDuration = function() {
    return this.stepDuration;
};

/**
 * Gets the time into the simulation at the last step. Use step to refresh the step time.
 *
 * Should be implemented by a child class.
 */
RealtimeSimulator.prototype.getStepTime = function() {
    return this.currentStep.diff(this.start);
};

