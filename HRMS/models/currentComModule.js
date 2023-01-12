import mongoose from "mongoose";

const CurrentCompany = mongoose.model('CurrentCompany', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    detaprment: {
        type: String,
    },
    designation: {
        type: String,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    salary: {
        type: Number,
    },
    joiningDate: {
        type: String,
    },
    reportedTo: {
        type: String,
    },

}, {
    timestamps: true,
}));

export default CurrentCompany;