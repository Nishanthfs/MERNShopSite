 const jwt =require("jsonwebtoken")
 async function authToken(req,res,next){
    try{
  const token =req.cookies?.token 


console.log("token",token)
  if(!token){
    return res.status(200).json({
        message:"Please Login...!",
        error: true,
        success: false
    })
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
    
    console.log(err)
    console.log("decoded",decoded) 
    if(err){
        console.log("error auth",err)

    }
    req.userId = decoded?._id
    next()

  });
  

    }catch(err){
        res.status(400).json({
            message:err.message || err,
            data:[],
            error: true,
            success: false
        })

    }
}
module.exports= authToken
// 2 day clearing this page error token error ,am learning first send reques after you will bresk the time period ,while not continue the token one more send reques you will get responce// 