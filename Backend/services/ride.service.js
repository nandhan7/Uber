const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');


async function calculateFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Invalid pickup or destination address');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    console.log(distanceTime)
    const distance = distanceTime.distance.value / 1000; //in km
    const duration = distanceTime.duration.value / 60; //in minutes

    const baseFare = {
        auto: 50,
        car: 100,
        motorcycle: 30
    };

    const perKmRate = {
        auto: 10,
        car: 20,
        motorcycle: 5
    };

    const perMinuteRate = {
        auto: 2,
        car: 5,
        motorcycle: 1
    };

    const fare = {
        auto: baseFare.auto + (perKmRate.auto * distance) + (perMinuteRate.auto * duration),
        car: baseFare.car + (perKmRate.car * distance) + (perMinuteRate.car * duration),
        motorcycle: baseFare.motorcycle + (perKmRate.motorcycle * distance) + (perMinuteRate.motorcycle * duration)
    };

    return fare;
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await calculateFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    })

    return ride;
}

function getOtp(num) {
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}