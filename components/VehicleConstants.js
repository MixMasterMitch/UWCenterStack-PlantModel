var constants = module.exports = {
    ROLLING_COEFF : 0.01,
    AIR_DRAG_COEFF : 0.295,
    TIRE_RADIUS : 0.336, // m
    AIR_DENSITY : 1.1, // kg / m^3
    FRONTAL_AREA : 2.295, // m^2
    MASS : 2250, // kg
    GRAVITY : 9.81, // m / s^2

};

module.exports.VEHICLE_DOWN_FORCE = constants.GRAVITY * constants.MASS;