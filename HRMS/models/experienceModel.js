import mongoose from "mongoose";

const Experience = mongoose.model('Experience', new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    previewsCompanies: [
        {
            companyName: {
                type: String,
            },
            designation: {
                type: String,
            },
            description: {
                type: String,
            },
            salary: {
                type: Number,
            },
            startDate: {
                type: String,
            },
            endDate: {
                type: String,
            },
            experience: {
                type: String,
            },
        }]
}, {
    timestamps: true,
}));

export default Experience;