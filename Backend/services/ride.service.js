const rideModel = require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./maps.service');
const crypto = require('crypto');


async function calculateFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Invalid pickup or destination address');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    // console.log(distanceTime)
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
        auto: Math.trunc(baseFare.auto + (perKmRate.auto * distance) + (perMinuteRate.auto * duration)),
        car: Math.trunc(baseFare.car + (perKmRate.car * distance) + (perMinuteRate.car * duration)),
        motorcycle: Math.trunc(baseFare.motorcycle + (perKmRate.motorcycle * distance) + (perMinuteRate.motorcycle * duration))
    };

    return { fare: fare, distance: distance };
}

module.exports.calculateFare = calculateFare;

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const result = await calculateFare(pickup, destination);
    const fare = result.fare

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

module.exports.confirmRide = async ({ rideId, captain }) => {

    if (!rideId) {
        throw new Error('Invalid ride id')
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found')
    }

    return ride

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Invalid ride id or otp')
    }

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found')
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP')
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride
}

module.exports.endRide = async ({ rideId, captain }) => {

    if (!rideId) {
        throw new Error('Invalid ride id')
    }

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found')
    }
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing')
    }

    const ridedetails = await rideModel.findOneAndUpdate({ _id: rideId }, {
        status: 'completed'
    })


    return ride
}