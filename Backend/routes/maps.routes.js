const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const { getAddressCoordinate } = require('../services/maps.service');
const { query } = require('express-validator');
const mapController = require('../controllers/map.controller');

router.get('/get-coordinates', query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser, mapController.getCoordinates);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser, mapController.getDistanceTime
)


router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser, 
    mapController.getAutocompleteSuggestions
)

module.exports = router; 