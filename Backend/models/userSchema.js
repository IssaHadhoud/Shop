const mongoose=require("mongoose");
const bcrypt =require("bcrypt")
const userSchema=mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String,required:true},
    role:{type:mongoose.Schema.Types.ObjectId,ref:"Role"},
    createAt:{type:Date, default:Date.now},
    imageURL:{type:String , default:"https://shop-yp92.onrender.com/uploads/Backend/uploads/1776374081320-user (1).png"}
})

userSchema.pre("save",async function(){
this.email =this.email.toLowerCase();
this.password =await bcrypt.hash(this.password,+(process.env.SALT))
})



module.exports=mongoose.model("User", userSchema)