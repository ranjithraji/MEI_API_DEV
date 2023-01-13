import mongoose from "mongoose";

const education=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    sslc: {
        sslcSchoolName: {
            type: String,
        },
        sslcBoard: {
            type: String,
        },
        sslcYearOfPassing: {
            type: Number,
        },
        sslcPercentage: {
            type: Number,
        },
    },
    hsc: {
        hscSchoolName: {
            type: String,
        },
        hscBoard: {
            type: String,
        },
        hscYearOfPassing: {
            type: Number,
        },
        hscPercentage: {
            type: Number,
        },
    },
    ug: {
        ugUniversityName: {
            type: String,
        },
        ugInstituteName: {
            type: String,
        },
        ugDepartmentCourse: {
            type: String,
        },
        ugYearOfPassing: {
            type: Number,
        },
        ugCgpa: {
            type: Number,
        }
    },
    pg: {
        pgUniversityName: {
            type: String,
        },
        pgInstituteName: {
            type: String,
        },
        pgDepartmentCourse: {
            type: String,
        },
        pgYearOfPassing: {
            type: Number,
        },
        pgCgpa: {
            type: Number,
        }
    },
    phd: {
        phdUniversityName: {
            type: String,
        },
        phdInstituteName: {
            type: String,
        },
        phdDepartmentCourse: {
            type: String,
        },
        phdYearOfPassing: {
            type: Number,
        },
        phdCgpa: {
            type: Number,
        }
    }
},
{
    timestamps: true,
}
);

const Education=mongoose.model('Education',education)
export default Education;

