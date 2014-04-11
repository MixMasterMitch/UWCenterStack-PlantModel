var VehicleDynamic = require('./VehicleDynamic');
var VehicleConstants = require('./VehicleConstants.js');
var util = require('util');

/**
 * This is where the vehicle force is converted into the speed based on the vehicle mass.
 * Ideal we would have some rotational mass calculations also.
 * @type {Function}
 */
var BodyDynamic = module.exports = function(name) {
    VehicleDynamic.call(this, name);
}
util.inherits(BodyDynamic, VehicleDynamic);

BodyDynamic.prototype._forceInChangeHandler = function(event) {
    console.log('_forceInChangeHandler ' + this.name);
    this.speedIn += event / VehicleConstants.MASS * simulator.getStepDuration();
    this.emit('speedIn.change', this.speedIn);

    /*
        JAVASCRIPT
     */
    var callbackFunction = ffi.Callback('void', [messagePtr], function(message) { _.defer(processMessage, message); });

    function readCANMessages() {

        // Initialize CAN buses
        initalize(); // C function for initializing buses

        // Listen for messages
        readLSMessages();
        readHSMessages();
    }

    function readHSMessages() {

        // no longer malloc a new message

        // start listening on the given channel for all of the ids we are interested in
        var interestingIds = [0x7C1, 0x7C2, 0x7C3];
        readCAN.async(HS_CHANNEL, interestingIds, interestingIds.length, callbackFunction, function() {
            // The async will never be called because the C function is in a loop
        });

    }

    function readLSMessages() {
        // Same idea as HS
    }

    function processMessage() {
        // Determine if this is the first message
        if (message.id == 0x7C1) {

            // Decode the message into something readable
            var speed = data[2];

            this.emit('canMessage.hs.vehicleSpeed.read', speed);
        } else if (/* other messages */) {

        }

        freeMessage(message);
    }

    /*
         C
     */
    typedef void (*callbackFunction)(Message* message);
    readCAN(int channel, int* ids, int idsLength, callbackFunction callback) {

        // Get the correct handle
        handle h;
        if (channel == HS_CHANNEL) {
            h = hsHandle;
        } else {
            h = lsHandle;
        }

        // Wait for a message to be in the buffer before looping
        while(canReadSync(h, 0xFFFFFFFF)) {

            // Check of each id in the buffer
            for (int i = 0; i < idsLength; i++) {
                if (canReadSpecific(h, ids[i],...) == canOK) {

                    // Create message
                    Message* message = createMessage();
                    message->id = ids[i];
                    message->data = ...;
                    ...

                    callback(message);
                }
            }

            // We don't care about everything else
            canFlushReceiveQueue(h);
        }
    }

}



