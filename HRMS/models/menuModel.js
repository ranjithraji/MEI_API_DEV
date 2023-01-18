import mongoose from "mongoose";


const menu=new mongoose.Schema({
    menuName:{
        type:String,
        required:true
    },
    menuCode:{
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

const Menu=mongoose.model('Menu',menu)
export default Menu;