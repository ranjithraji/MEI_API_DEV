export const checkAccessGet=(user,menu)=>{
    let access
    user?.isOwner?access=true:user?.access?.map((item)=>{
        if(item?.menu?._id==menu){
            return item?.get==true?access=true:access=false;
        }
    })
    return access
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
    let access
    if(menu==undefined) return access=undefined
    // user.access?.map(i=>console.log(i.menu._id==menu));
    user.isOwner?access=true:user?.access?.map((item)=>{
        if(item?.menu?._id==menu){
            item?.create==true?access=true:access=false;
        }else{
            // if not not menu update this next task
        }
    })
    return access
}

export const checkAccessUpdate=(user,menu)=>{
    let access
    user?.isOwner?access=true:user?.access?.map((item)=>{
        if(item?.menu?._id==menu){
            item?.update==true?access=true:access=false;
        }
    })
    return access
}

export const checkAccessDelete=(user,menu)=>{
    let access
    user?.isOwner?access=true:user?.access?.map((item)=>{
        if(item?.menu?._id==menu){
            item?.delete==true?access=true:access=false;
        }
    })
    return access
}