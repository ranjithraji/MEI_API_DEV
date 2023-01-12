import mongoose from "mongoose";

const Address=mongoose.model('Address',new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    postalCode: {
        type: Number,
    },

},{
    timestamps: true,
}));

export default Address;