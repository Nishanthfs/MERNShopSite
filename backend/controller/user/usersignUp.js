const usermodel = require("../../models/usermodel")
const bcrypt = require('bcryptjs')



async function userSignUpcontroller(req,res){
    try{
    const{email, password, name}= req.body
   const  user= await usermodel.findOne({email})
   if(user){
       throw new Error(" Already user exit.")

   }
    
    if(!email){
        throw new Error("Please provide the email")
    }
    if(!password){
        throw new Error("Please provide the password")
    }
    if(!name){
        throw new Error("Please provide the name")
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hashSync(password, salt);
  
    if(!hashpassword){
        throw new Error("Something is wrong")
    }
    const payload={
        ...req.body,
        role:"GENERAL",
        password : hashpassword
    }
    const userdata = new usermodel(payload)
    const saveuser = await userdata.save()
    res.status(201).json({
        data: saveuser,
        success: true,
        error: false,
        message: "user created successfully"
    })



 }catch(err){
       
        res.json({
            message : err.message || err,
            error : true,
            success : false,

        })

    }
}


module.exports = userSignUpcontroller