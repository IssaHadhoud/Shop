const authorization =(text)=>{
    console.log(text)
    return(req,res,next)=>{
        console.log("TOKEN:", req.token);
console.log("PERMISSIONS:", req.token?.permissions);
        if(!req.token.permissions.includes(text)){   
            console.log(req.token.permissions.includes(text))
            res.status(401).json({
                success:false,
                message:"unauthorized"
            })
        }else{
            next()
        }
    }

}
 module.exports=authorization