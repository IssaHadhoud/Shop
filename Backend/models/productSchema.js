const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String,required:true},
    price:{type:Number, required:true},
    createAt:{type:Date, default:Date.now},
    stock:{type:Number,required:true},
    imageURL:{type:String, required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category"},
    createBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

module.exports=mongoose.model("Product", productSchema)