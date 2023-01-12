import mongoose from "mongoose";

const request=new mongoose.Schema({
    requestMenu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Menu',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
    },
    reason:{
        type:String,
    },
});

const Request=mongoose.model('Request',request)
export default Request;