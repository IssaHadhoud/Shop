const express =require("express")
const categoryRouter=express.Router();
const {getCategories,updateCategory,createCategory,deleteCategory}=require("../controllers/categoryController");
const authentication = require("../middleware/authentication");
const authorization=require("../middleware/authorizeRole")
const upload = require("../middleware/upload");


categoryRouter.get("/" ,getCategories)
categoryRouter.put("/:id",upload.single("image"),authentication,authorization("update"),updateCategory);
categoryRouter.post("/",upload.single("image"),authentication,authorization("write"),createCategory)
categoryRouter.delete("/:id",authentication,authorization("delete"),deleteCategory)


module.exports=categoryRouter