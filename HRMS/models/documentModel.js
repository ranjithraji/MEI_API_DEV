import mongoose from "mongoose";

const Document = mongoose.model('Document', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bankDetails: {
        accountNo: {
            type: Number,
        },
        ifsc: {
            type: String,
        },
        branch: {
            type: String,
        },
        bankName: {
            type: String,
        },
        name: {
            type: String,
        },
    },
    identificationDetails: {
        adhaarNo: {
            type: Number,
        },
        panNo: {
            type: String,
        },
        passportNo: {
            type: String,
        },
        uanNo: {
            type: String,
        },
        pfNo: {
            type: String,
        },
        esiNo: {
            type: String,
        },
    },
    medicalDetails: {
        vaccination1Date: {
            type: String,
        },
        vaccination2Date: {
            type: String,
        },
    },
}, {
    timestamps: true
}))

export default Document