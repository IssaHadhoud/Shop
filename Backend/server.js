const express = require("express");
const app = express();
require("dotenv").config()
const cors=require("cors")
const db = require("./models/db");
app.use(express.json());
app.use(cors())
app.use("/uploads",express.static("uploads"))
const productRouter=require("./routers/product")
app.use("/product",productRouter)
const userRouter=require("./routers/user");
app.use("/user",userRouter)
const orderRouter=require("./routers/order")
app.use("/order" ,orderRouter)

const categoryRouter =require("./routers/category");
app.use("/category",categoryRouter)

const roleRouter =require("./routers/role");
app.use("/role",roleRouter)

const cartRoute =require("./routers/cart")
app.use("/cart",cartRoute)




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example application listening at http://localhost:${PORT}`);
});