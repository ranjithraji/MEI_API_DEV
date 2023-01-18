export const checkAccessGet=(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if (!menu)  return obj={access:false,message:"give the menu id",status:400}  
    user.isOwner?obj={access:true,message:null}:user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.get==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count==0)  return obj={access:false,message:"This menu id does not mapping with this user",status:400}
    return obj
}

// export const checkAccessGetAll=(user,menu)=>{
//     let access
//     user?.isOwner?access=true:user?.access?.map((item)=>{
//         if(item?.menu?._id==menu){
//             return item?.get==true?access=true:access=false;
//         }
//     })
//     return access
// }

export const checkAccessCreate=(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if (!menu)  return obj={access:false,message:"give the menu id",status:400}  
    user.isOwner?obj={access:true,message:null}:user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.create==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count<=0)  return obj={access:false,message:"This menu id not mapping with this user",status:400}
    return obj
}

export const checkAccessUpdate=(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if (!menu)  return obj={access:false,message:"give the menu id",status:400}  
    user.isOwner?obj={access:true,message:null}:user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.update==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count<=0)  return obj={access:false,message:"This menu id not mapping with this user",status:400}
    return obj
}

export const checkAccessDelete=(user,menu)=>{
    let obj={access:false,message:null,status:400}
    let count=0
    if (!menu)  return obj={access:false,message:"give the menu id",status:400}  
    user.isOwner?obj={access:true,message:null}:user?.access?.map(async(item)=>{
        if(item?.menu?._id==menu){
            item?.decheckAccessDelete==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
            count++
        }
    })
    if(count<=0)  return obj={access:false,message:"This menu id not mapping with this user",status:400}
    return obj
}