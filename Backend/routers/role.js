const express=require("express");
const roleRouter=express.Router();
const {createRole,getRoles}=require("../controllers/roleController")

roleRouter.get("/",getRoles);
roleRouter.post("/",createRole)

module.exports=roleRouter