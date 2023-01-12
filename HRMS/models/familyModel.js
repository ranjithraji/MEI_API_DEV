import mongoose from "mongoose";

const Family = mongoose.model('Family', new mongoose.Schema({
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
}));
export default Family;