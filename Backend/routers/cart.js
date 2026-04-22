const express=require("express");
const cartRoute =express.Router();
const {addToCart,getCart,updateCart,removeFromCart} =require("../controllers/cartController")

cartRoute.get("/:sessionId",getCart);
cartRoute.post("/add",addToCart)

cartRoute.put("/update/:sessionId/:id",updateCart)
cartRoute.delete("/:sessionId/:productId",removeFromCart)

module.exports=cartRoute