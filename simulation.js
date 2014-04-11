//var test = require('./driveCycles/pedalToTheMetal.json');
//var _ = require('./utils/underscoreExtensions.js');
//
//console.log(test);
//console.log(_.keys(test));

var _ = require('underscore');

var RealtimeSumulator = require('./simulators/RealtimeSimulator');
var simulator = global.simulator = new RealtimeSumulator();
simulator.start();

var Component = require('./components/Component');
var Engine = require('./components/Engine');
var Transmission = require('./components/Transmission');
var Wheels = require('./components/Wheels');
var RollingResistance = require('./components/RollingResistance');
var AirResistance = require('./components/AirResistance');
var BodyDynamic = require('./components/BodyDynamic');

var engine = new Engine('engine');
var trans = new Transmission('trans');
var engine2 = new Engine('engine2');
var trans2 = new Transmission('trans2');
var wheels = new Wheels('wheels');
var rollingResistance = new RollingResistance('rr');
var airResistance = new AirResistance('ar');
var bodyDynamic = new BodyDynamic('bd', 10);

engine.connectsTo(trans).connectsTo(wheels);
engine2.connectsTo(trans2).connectsTo(wheels);
wheels.connectsTo(rollingResistance).connectsTo(airResistance).connectsTo(bodyDynamic);

engine.on('speedIn.change', function(speed) {
    console.log('engine speed: ' + speed);
    _.defer(_.bind(engine.setAccelPedalPosition, this), 30);
})
engine2.on('speedIn.change', function(speed) {
    console.log('engine2 speed: ' + speed);
    _.defer(_.bind(engine2.setAccelPedalPosition, this), 30);
})
engine.on('torqueOut.change', function(torque) {
    console.log('engine torqueOut: ' + torque);
})
wheels.on('speedIn.change', function(speed) {
    console.log('wheels speed: ' + speed);
})
wheels.on('forceOut.change', function(torque) {
    console.log('wheels forceOut: ' + torque);
})
rollingResistance.on('speedIn.change', function(speed) {
    console.log('rollingResistance speed: ' + speed);
})
rollingResistance.on('forceOut.change', function(torque) {
    console.log('rollingResistance forceOut: ' + torque);
})
airResistance.on('speedIn.change', function(speed) {
    console.log('airResistance speed: ' + speed);
})
airResistance.on('forceOut.change', function(torque) {
    console.log('airResistance forceOut: ' + torque);
})
bodyDynamic.on('speedIn.change', function(speed) {
    console.log('bodyDynamic speed: ' + speed);
    simulator.step();
    console.log('simulationTime: ' + simulator.getStepTime());
})
bodyDynamic.on('forceOut.change', function(torque) {
    console.log('bodyDynamic forceOut: ' + torque);
})

engine.setAccelPedalPosition(30);
engine2.setAccelPedalPosition(30);