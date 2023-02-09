import Menu from "../models/menuModel.js";

export const createMenu = async (req, res) => {
  const num = Buffer.from(Math.random().toString())
    .toString()
    .substring(10, 12);
  // let z= num.toString().slice(0,2)
  let code = "HRM";
  let menu = req.body.menuName?.toLowerCase();
  menu=menu?.charAt(0).toUpperCase() + menu.slice(1)
  let gr = menu?.toUpperCase().slice(0, 3); 
  const newcode = code + gr + num;
  const found = await Menu.findOne({ menuName: menu });
  if (found) return res.status(400).json({ message: "Menu already exists" });
  try {
    const data = await new Menu({
      menuName: menu,
      menuCode: newcode,
    });
    await data.save();
    res.status(201).json({ message: "Menu Created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getmenu = async (req, res) => {
  try {
    let id = req.params.id;
    const menu = await Menu.findById({ _id: id });
    if (menu.length == 0)
      return res.status(200).json({ mesage: "Sorry no menu has right now" });

    res.status(200).json({ data: menu });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getAll=async(req,res)=>{
    try {
        const menu= await Menu.find()
        if(menu.length==0) return res.status(200).json({mesage:"Sorry no menu has right now"})

        res.status(200).json({data:menu})

    } catch (error) {
        res.status(400).json({message:error.message});
    }
}




export const deletemenu=async(req,res)=>{
    try {
        const menuName = req.body.menuName;
        let xmenu= await Menu.findOneAndDelete({menuName:menuName})
        if(!xmenu) return res.status(200).json({message:`sorry, there is no field in ${menuName}`})
        res.status(200).json({message:"Menu removed"})
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const updatemenu=async(req,res)=>{
    try {
        const menuName = req.body.menuName
        const menuCode= req.body.menuCode 
        let xmenu = await Menu.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})

        if(!xmenu) return res.status(200).json({message:`sorry, there is no field in ${menuName}`})
        res.status(200).json({message:"Menu Updated"})


    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

export const menuTable=async(req,res)=>{
    try {
        let obj=[]
        const menu= await Menu.find()
        menu.map((item)=>{
            if(item.isBlock===false && item.isActive===true){
                obj.push(item);
            }
        })
        if(!menu) return res.status(200).json({message:"Sorry no Data"})
        res.status(200).json({data:obj}) 
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}
export const menuTable2=async(req,res)=>{
    try {
        let obj=[]
        const menu= await Menu.find()
        menu.map((item)=>{
            if(item.isBlock===true){
                obj.push(item);
            }
        })
        if(!menu) return res.status(200).json({message:"Sorry no Data"})
        res.status(200).json({data:obj}) 
    } catch (error) {
    res.status(400).json({message:error.message});
    }
}



export const menuName = async (req, res) => {
  try {
    const menu = await Menu.findOne({ menuName: req.body.menuName });
    if (!menu) return res.status(200).json({ message: "Sorry no Data" });
    res.status(200).json({ data: menu });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
