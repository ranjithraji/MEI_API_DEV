import mongoose from "mongoose";

const currentCompany =  new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    department: {
        type: String,
        required: true
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
        required: true
    },
    joiningDate: {
        type: String,
        required: true
    },
    reportedTo: {
        type: String,
        required: true
    },
    isFresher:{
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true,
});


const CurrentCompany=mongoose.model('CurrentCompany',currentCompany)
export default CurrentCompany;