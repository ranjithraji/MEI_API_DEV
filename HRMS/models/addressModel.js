import mongoose from "mongoose";

const address=new mongoose.Schema({
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
});

const Address=mongoose.model("Address",address)

export default Address;