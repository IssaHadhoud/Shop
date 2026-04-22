const categoryModel=require("../models/categorySchema")

const getCategories=(req,res)=>{
    categoryModel.find({}).then((result)=>{
        if(result.length ===0){
            res.status(404).json({
                success:false,
                message:"Categories not found"
            })
        }else{
            res.status(200).json({
                success:true,
                category:result
            })
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    })
}



const updateCategory= async(req,res)=>{
    const {id}=req.params;
    const update=req.body;
    const imageURL = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";
      if(imageURL){
        update.imageURL = imageURL
      }
    categoryModel.findByIdAndUpdate(id,update,{new:true}).then((result)=>{
        res.status(201).json({
            success:true,
            message:"category updated successfully",
            category:result
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    })

   
}

const createCategory=(req,res)=>{
    const {title,description,createdBy}=req.body;
      const imageURL = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : "";
    const newCategory=categoryModel({
        title,
        description,
        imageURL,
        createdBy:req.user?.id
    });
    newCategory.save().then((result)=>{
        res.status(201).json({
            success:true,
            message:"Created successfully",
            category:result
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    })
    
}

const deleteCategory=(req,res)=>{
    const {id}=req.params;
    categoryModel.findByIdAndDelete(id).then((result)=>{
        if(!result){
            res.status(404).json({
                success:false,
                message:"The category not found"
            })
        }else{
            res.status(200).json({
                success:true,
                message:"Category deleted successfully"
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


module.exports={getCategories,updateCategory,createCategory,deleteCategory}