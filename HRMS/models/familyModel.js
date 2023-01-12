import mongoose from "mongoose";

const family = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    members: [
        {
            name: {
                type: String,
            },
            relationship: {
                type: String,
            },
            occupation: {
                type: String,
            },
            dob: {
                type: String,
            },
            adhaarNo: {
                type: Number,
            },
            emergencyContact: {
                type: Number,
            },

        }

    ]
}, {
    timestamps: true,
});

const Family=mongoose.model('Family',family)
export default Family;