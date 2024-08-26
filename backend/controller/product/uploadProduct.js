const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../NHelpers/permission")

async function UploadProductContoller(req,res){
    try{
        const sessionUserId = req.userId
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

  const UploadProduct = new productModel(req.body)
  const saveUploadProduct= await UploadProduct.save()
    res.status(201).json({
      message: "Product Upload successfully",
      success: true,
      error: false,
      data: saveUploadProduct
  })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error:true,
            success:false
        })

    }
}

module.exports= UploadProductContoller