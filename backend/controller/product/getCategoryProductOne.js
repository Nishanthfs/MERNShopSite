const productModel =require ("../../models/productModel")


const getCategoryProduct = async(req,res)=>{
    try{
        const productCategory =await productModel.distinct("category")
        console.log("category",productCategory)
        // using array to store each product one by one
        const productBycategor=[]
        for(const category of productCategory){
            const product=await productModel.findOne({category})
            if(product){
                productBycategor.push(product)
            }
        }
        res.json({
            message:"category product",
            data:productBycategor,
            success:true,
            error: false
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error:true,
            success:false
        })


    }
}
module.exports=getCategoryProduct