const axios = require('axios');
const captainModel = require('../models/captain.model');
require('dotenv').config()

const axiosInstance = axios.create();


module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    if (typeof address !== 'string' || address.trim() === '') {
        throw new Error('Invalid address provided');
    }

    try {
        const response = await axiosInstance.get(url);

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            return { ltd: lat, lng };
        } else if (response.data.status === 'ZERO_RESULTS') {
            return null; // Or: return {};
        } else {
            console.log(response)
            throw new Error(`Unable to fetch coordinates: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Invalid origin or destination provided');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const { distance, duration } = response.data.rows[0].elements[0];
            return { distance, duration };
        }
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        throw error;
    }
}

module.exports.getAutocompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axiosInstance.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(`Unable to fetch suggestions: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        throw error;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    })

    return captains;
}