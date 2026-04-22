const jwt =require("jsonwebtoken");
const authentication=async(req,res,next)=>{
    if(req.headers.authorization){
        const token=req.headers.authorization.split(" ").pop();
        try{
            const verify=await jwt.verify(token,process.env.SECRET)
            req.token=verify
            console.log(verify)
            next()
        }
        catch (err){
            console.log(err);
            res.status(401).json({
                success:false,
                message:"please login first"
            })
        }
    }
}
module.exports=authentication