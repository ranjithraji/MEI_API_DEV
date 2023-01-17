export const checkAccessGet=(user,menu)=>{
    let obj={access:false,message:null,status:0}
    user.isOwner?obj={access:true,message:null}:user?.access?.map((item)=>{
        if (!menu)  return obj={access:false,message:"give the menu id",status:400}       
        if(item?.menu?._id==menu){
            item?.get==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
        }
    })
    return obj
}

export const checkAccessCreate=(user,menu)=>{
    let obj={access:false,message:null,status:0}
    user.isOwner?obj={access:true,message:null}:user?.access?.map((item)=>{
        if (!menu)  return obj={access:false,message:"give the menu id",status:400}       
        if(item?.menu?._id==menu){
            item?.create==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
        }
    })
    return obj
}

export const checkAccessUpdate=(user,menu)=>{
    let obj={access:false,message:null,status:0}
    user.isOwner?obj={access:true,message:null}:user?.access?.map((item)=>{
        if (!menu)  return obj={access:false,message:"give the menu id",status:400}       
        if(item?.menu?._id==menu){
            item?.update==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
        }
    })
    return obj
}

export const checkAccessDelete=(user,menu)=>{
    let obj={access:false,message:null,status:0}
    // console.log(user);
    user.isOwner?obj={access:true,message:null}:user?.access?.map((item)=>{
        console.log(item);
        console.log(menu);
        if (!menu)  return obj={access:false,message:"give the menu id",status:400}       
        if(item?.menu?._id==menu){
            item?.delete==true?obj={access:true,message:null}:obj={access:false,message:"your not right person to do this",status:401};
        }
    })
    return obj
}