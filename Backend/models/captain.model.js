const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt=require('bcrypt')

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long ']
        },
        lastname: {
            type: String,
            required: true,
            minlength: [5, 'Last name must be at least 5 characters long ']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],

    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [8, 'Password must be 8 characters long']
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be atleast 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be atleast 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1 ']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
})

captainSchema.methods.generateAuthToken= function(){
    const token =jwt.sign({_id:this._id},process.env.JWT_SECRET ,{expiresIn:'24h'})
    return token;
}

captainSchema.methods.comparePassword=async function (password) {
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword=async function (password){
    return await bcrypt.hash(password,10)
}
const captainModel=mongoose.model('captain',captainSchema)

module.exports=captainModel