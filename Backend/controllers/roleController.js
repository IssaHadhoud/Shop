const roleModel = require("../models/roleSchema");

const createRole = async (req, res) => {
  const { type, permissions } = req.body;
  try {
    const exists=await roleModel.findOne({type})
    if(exists){
        res.status(400).json({
            success:false,
            message:"Role already exists"
        })
    }else{
    const newRole = roleModel({
      type,
      permissions,
    });
    const saved = await newRole.save();
    res.status(201).json({
      success: true,
      message: "Role created ",
      roles: saved,
    });
}
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getRoles=(req,res)=>{
    roleModel.find({}).then((result)=>{
        if(result.length===0){
            res.status(404).json({
                success:false,
                message:"No role was found"
            })
        }else{
            res.status(200).json({
                success:true,
                role:result
            })
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    })

}

module.exports={createRole,getRoles}