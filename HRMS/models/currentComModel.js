import mongoose from "mongoose";

const currentCompany =  new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    department: {
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
    isFresher:{
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
});


const CurrentCompany=mongoose.model('CurrentCompany',currentCompany)
export default CurrentCompany;