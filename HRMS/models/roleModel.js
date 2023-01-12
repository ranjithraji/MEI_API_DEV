import mongoose from "mongoose";

const role=new mongoose.Schema({
    roleType:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true8
    },
    isActive:{
        type:Boolean,
        default:false
      },
    isBlock:{
        type:Boolean,
        default:false
      }
});

const Role=mongoose.model('User',role)
export default Role;