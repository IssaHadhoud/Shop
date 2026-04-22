const express=require("express");
const userRouter =express.Router();
const {getProfile,updateProfile,getAllUser,deleteUser,register,login}=require("../controllers/userController")
const authentication=require("../middleware/authentication")
const authorization=require("../middleware/authorizeRole")
const upload = require("../middleware/upload");


userRouter.get("/profile",authentication,authorization("readUser","read"),getProfile)
userRouter.put("/profile/:id", upload.single("image"),authentication,authorization("updateUser"),updateProfile);
userRouter.get("/",authentication,authorization("read"),getAllUser);
userRouter.delete("/:id",authentication,authorization("delete"),deleteUser)
userRouter.post("/register", upload.single("image"),register)
userRouter.post("/login",login)


module.exports=userRouter;