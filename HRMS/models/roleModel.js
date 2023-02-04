import mongoose from "mongoose";

const role=new mongoose.Schema({
    roleType:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
       default:true
      },
    isBlock:{
        type:Boolean,
        default:false
      }
});

const Role=mongoose.model('Role',role)
export default Role;