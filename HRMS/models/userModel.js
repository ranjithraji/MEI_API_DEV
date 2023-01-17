import mongoose from "mongoose";

const user =  new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    dob:{
        type:String,
    },
    gender:{
        type:String,
        enum:['Male','Female','Others']
    },
    bloodGroup:{
        type:String,
    },
    mobileNo:{
        type:Number,
    },
    password:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    time:{
        type: Date, 
        default: Date.now 
    },
    isOwner:{
        type:Boolean,
        default:false
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
    },
    addressDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
    },
    familyDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Family',
    },
    documentDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Document',
    },
    educationDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Education',
    },
  
    
},  {
    timestamps: true
}
)

const User=mongoose.model('User',user)
export default User;