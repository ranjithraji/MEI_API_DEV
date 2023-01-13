import mongoose from "mongoose";


const assets=new mongoose.Schema({
    assetName:{
        type:String,
        required:true
    },
    assetCode:{
        type:String,
        required:true
    },
    assetType:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
});

const Assets=mongoose.model('Assets',assets)
export default Assets;