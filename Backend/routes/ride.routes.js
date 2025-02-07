const express=require('express');
const authMiddleware=require('../middlewares/auth.middleware');
const router=express.Router();
const {body}=require('express-validator');
const rideController=require('../controllers/ride.controller');
router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

module.exports=router;