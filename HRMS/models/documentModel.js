import mongoose from "mongoose";

const document =  new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bankDetails: {
        accountNo: {
            type: Number,
            required: true
        },
        ifsc: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        bankName: {
            type: String,
            required: true
        },
        accountHolderName: {
            type: String,
            required: true
        },
    },
    identificationDetails: {
        aadhaarNo: {
            type: String ,
            required: true
        },
        panNo: {
            type: String,
            required: true
        },
        passportNo: {
            type: String,
            required: true
        },
        uanNo: {
            type: String,
            required: true
        },
        pfNo: {
            type: String,
            required: true
        },
        esiNo: {
            type: String,
            required: true
        },
    },
    medicalDetails: {
        vaccination1Date: {
            type: String,
            required: true
        },
        vaccination2Date: {
            type: String,
            required: true
        },
    },
}, {
    timestamps: true
})

const Document=mongoose.model('Document',document)
export default Document