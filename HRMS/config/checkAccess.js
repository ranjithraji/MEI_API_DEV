import Menu from "../models/menuModel.js"

export const checkAccessGet=async(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if(user.isOwner) return obj={access:true,message:"owner is true",status:200}
    if (!menu)  return obj={access:false,message:"give the menu id",status:404}  
    let found = await Menu.findById({_id:menu})
    if (!found) return obj={access:false,message:"menu id is not found",status:404};
    user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.get==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count==0)  return obj={access:false,message:"This menu id does not mapping with this user",status:400}
    return obj
}

export const checkAccessCreate=async(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if(user.isOwner) return obj={access:true,message:"owner is true",status:200}
    if (!menu)  return obj={access:false,message:"give the menu id",status:404}  
    let found = await Menu.findById({_id:menu})
    if (!found) return obj={access:false,message:"menu id is not found",status:404};
    user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.create==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count<=0)  return obj={access:false,message:"This menu id not mapped with this user",status:400}
    return obj
}

export const checkAccessUpdate=async(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if(user.isOwner) return obj={access:true,message:"owner is true",status:200}
    if (!menu)  return obj={access:false,message:"give the menu id",status:404}  
    let found = await Menu.findById({_id:menu})
    if (!found) return obj={access:false,message:"menu id is not found",status:404};
    user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.update==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count<=0)  return obj={access:false,message:"This menu id not mapping with this user",status:400}
    return obj
}

export const checkAccessDelete=async(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if(user.isOwner) return obj={access:true,message:"owner is true",status:200}
    if (!menu)  return obj={access:false,message:"give the menu id",status:404}  
    let found = await Menu.findById({_id:menu})
    if (!found) return obj={access:false,message:"menu id is not found",status:404};
    user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.decheckAccessDelete==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count<=0)  return obj={access:false,message:"This menu id not mapping with this user",status:400}
    return obj
}