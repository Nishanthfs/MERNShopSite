const bcrypt=require("bcryptjs")
const usermodel = require("../../models/usermodel")
const jwt = require('jsonwebtoken');
async function userSignIncontroller(req,res){

    try{

        const {email,password}=req.body

        if(!email){
            throw new Error("Please provide the email")
        }
        if(!password){
            throw new Error("Please provide the password")
        }
     
        const  user= await usermodel.findOne({email})
        if(!user){
            throw new Error("user not Found")
        }

        const checkpassword=await bcrypt.compare(password,user.password)
        console.log("checkpassword",checkpassword)

        if(checkpassword){
            const tokendata={
                _id: user._id,
                email: user.email,

            }
           const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET_KEY,{expiresIn: 60 * 60 * 8});

           const tokenoption={
            httpOnly: true,
            secure: true
           }
           res.cookie("token",token,tokenoption).json({
            message : "Login successfully",
            data: token,
            success: true,
            error: false
              

           })

        }else{
          throw new Error("Please check Password")
        }

   

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false,

        })

    }

}



module.exports= userSignIncontroller