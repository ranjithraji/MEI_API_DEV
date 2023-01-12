import mongoose from "mongoose";

const Education=mongoose.model('Education',new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sslc: {
        schoolName: {
            type: String,
        },
        board: {
            type: String,
        },
        yearOfPassing: {
            type: Number,
        },
        percentage: {
            type: Number,
        },
    },
    hsc: {
        schoolName: {
            type: String,
        },
        board: {
            type: String,
        },
        yearOfPassing: {
            type: Number,
        },
        percentage: {
            type: Number,
        },
    },
    ug: {
        universityName: {
            type: String,
        },
        instituteName: {
            type: String,
        },
        departmentCourse: {
            type: String,
        },
        yearOfPassing: {
            type: Number,
        },
        cgpa: {
            type: Number,
        }
    },
    pg: {
        universityName: {
            type: String,
        },
        instituteName: {
            type: String,
        },
        departmentCourse: {
            type: String,
        },
        yearOfPassing: {
            type: Number,
        },
        cgpa: {
            type: Number,
        }
    },
},
{
    timestamps: true,
}
));

export default Education;

