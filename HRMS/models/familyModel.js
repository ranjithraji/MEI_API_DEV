import mongoose from "mongoose";

const family = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    adhaarNo: {
        type: Number,
        required: true
    },
    emergencyContact: {
        type: Number,
        required: true
    }, 
   
}, {
    timestamps: true,
});

const Family=mongoose.model('Family',family)
export default Family;