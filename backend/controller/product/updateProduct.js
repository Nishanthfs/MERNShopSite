
const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../NHelpers/permission")

async function UpdateProductController(req,res){ 
    try{
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission denied")
        }
 const {_id, ...resBody} = req.body
 const uploadProduct = await productModel.findByIdAndUpdate(_id,resBody)
 res.json({
    message : "Product Update Successfully",
    data : uploadProduct,
    success : true,
    error : false,
 })

        

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports=UpdateProductController