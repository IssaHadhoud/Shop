const express=require("express");
const orderRouter=express.Router();
const{getOrder,getAllOrder,getMyOrders,createOrder}=require("../controllers/orderController")
const authentication=require("../middleware/authentication");
const authorization = require("../middleware/authorizeRole");

orderRouter.get("/",authentication,authorization("read"),getAllOrder)
orderRouter.post("/checkout",authentication,createOrder)

orderRouter.get("/myOrder",authentication,authorization("readUser","read"),getMyOrders);
orderRouter.get("/:id",authentication,getOrder);


module.exports=orderRouter