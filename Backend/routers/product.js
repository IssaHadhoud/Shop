const express=require("express")
const  productRouter=express.Router();
const {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct,getProductByCategory}=require("../controllers/productController")
const authentication=require("../middleware/authentication")
const authorization=require("../middleware/authorizeRole")
const upload = require("../middleware/upload");


productRouter.get("/" ,getAllProducts);
productRouter.get("/:id",getProduct);
productRouter.post("/" , upload.single("image"),authentication,authorization("write"),createProduct);
productRouter.put("/:id", upload.single("image"),authentication,authorization("update"),updateProduct);
productRouter.delete("/:id",authentication,authorization("delete"),deleteProduct);
productRouter.get("/category/:Id",getProductByCategory)


module.exports=productRouter