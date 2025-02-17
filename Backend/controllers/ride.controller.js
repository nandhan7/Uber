const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }

    const { pickup, destination, vehicleType } = req.body;


    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });


        res.status(200).json({
            status: 'success',
            data: ride,
        });

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        // console.log("pickupCoordinates", pickupCoordinates)
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);
        // console.log("captains", captainsInRadius)
        ride.otp = "";
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')
        rideWithUser.otp = ""
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }

}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
    const { pickup, destination } = req.query;
    try {
        const result = await rideService.calculateFare(pickup, destination);
        const fare = result.fare;
        const distance = result.distance;
        return res.status(200).json({
            status: 'success',
            data: { fare, distance },
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

module.exports.confirmRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
    const { rideId, captain } = req.body;

    try {
        const ride = await rideService.confirmRide({ rideId, captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })
        return res.status(200).json({
            status: 'success',
            data: ride,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

module.exports.startRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
    const { rideId, otp } = req.body;
    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json({
            status: 'success',
            data: ride,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

module.exports.endRide = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })
        return res.status(200).json({
            status: 'success',
            data: ride,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}
