const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }

    const { pickup, destination, vehicleType } = req.body;
    console.log(req)

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        return res.status(200).json({
            status: 'success',
            data: ride,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }

}