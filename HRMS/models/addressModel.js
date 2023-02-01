import mongoose from "mongoose";

const address=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },

},{
    timestamps: true,
});

const Address=mongoose.model("Address",address)
export default Address;