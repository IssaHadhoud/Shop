const productModel=require("../models/productSchema")

const getAllProducts=(req,res)=>{
    productModel.find({}).populate("category").then((result)=>{
        if(result.length===0){
            res.status(404).json({
                success:false,
                message:"No product was found"
            })
        }
        else{
        res.status(200).json({
            success:true,
            message:"All product",
            product:result
        })
    }
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    })

}
const getProduct= async(req,res)=>{
  try {
    const {id}= req.params;
     const result=await productModel.findById(id).populate("category")
     console.log(result)
    if(!result){
        res.status(404).json({
            success:false,
            message:"The product is not found"
        })
    }
    else{
        res.status(200).json({
            success:true,
            Product:result
        })
    }
}
catch(err){
    console.log(err)
    res.status(500).json({
        success:false,
        message:"Server error"
    })
}


}
const createProduct=(req,res)=>{
    const {name,description,price,stock,category,createdBy}=req.body;
    console.log(name)
    const imageURL = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";
      console.log(imageURL)
    const newProduct=productModel({
        name,
        description,
        price,
        stock,
        imageURL,
        category,
        createBy:req.user?.id
    })
    newProduct.save().then((result)=>{
        if(!result){
            res.status(400).json({
                success:false,
                message:"Something went wring"
            })
        }else{
            res.status(201).json({
                success:true,
                message:"Product created successfully"
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

const getProductByCategory=(req,res)=>{
    const {Id}=req.params;
    productModel.find({category: Id }).then((result)=>{
        if(result.length === 0){
            res.status(404).json({
                success:false,
                message:"No products was found"
            })
        }else{
            res.status(200).json({
                success:true,
                products:result
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


const updateProduct=(req,res)=>{
    const {id}=req.params;
    const update=req.body;
    const imageURL = req.file
      ? `http://localhost:5000/uploads/${req.file.filename}`
      : "";
      if(imageURL){
        update.imageURL = imageURL
      }
    productModel.findByIdAndUpdate(id,update,{new:true}).then((result)=>{
        if(!result){
            res.status(404).json({
                success:false,
                message:"No product was found"
            })
        }else{
            res.status(201).json({
                success:true,
                message:"Product updated successfully",
                product:result
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
const deleteProduct=(req,res)=>{
  const {id}=req.params;
  productModel.findByIdAndDelete(id).then((result)=>{
    if(!result){
        res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    else{
        res.status(200).json({
            success:true,
            massage:"Deleted successfully"
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

module.exports={getAllProducts,getProduct,createProduct,updateProduct,deleteProduct,getProductByCategory}