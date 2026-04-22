const mongoose=require("mongoose")
const roleSchema=mongoose.Schema({
    type:{type:String , required:true},
    permissions:[{type:String ,required:true}]


})
module.exports=mongoose.model("Role",roleSchema)