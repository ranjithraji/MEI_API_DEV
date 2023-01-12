import mongoose from "mongoose";

const education=new mongoose.Schema({
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
);

const Education=mongoose.model('Education',education)
export default Education;

