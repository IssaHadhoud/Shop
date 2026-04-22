const mongoose =require("mongoose");
const categorySchema=mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    imageURL:{type:String, required:true},
    createBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createAt:{type:Date, default:Date.now}

})
module.exports=mongoose.model("Category", categorySchema)