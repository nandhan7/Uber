const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);

        res.status(200).json({
            status: 'success',
            data: coordinates,
        });
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: 'Coordinates not found',
        });
    }
}

module.exports.getDistanceTime = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: errors.array(),
            });
        }
        const { origin, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json({
            status: 'success',
            data: distanceTime,
        })

    } catch (error) {

    }
}

module.exports.getAutocompleteSuggestions = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: errors.array(),
        });
    }
    const { input } = req.query;

    try {
        const suggestions = await mapService.getAutocompleteSuggestions(input);

        res.status(200).json({
            status: 'success',
            data: suggestions,
        });
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: 'Suggestions not found',
        });
    }
}