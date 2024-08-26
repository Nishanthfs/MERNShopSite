const express= require("express")
const router = express.Router()

const userSignUpcontroller = require("../controller/user/usersignUp")
const userSignIncontroller = require("../controller/user/usersignIn")
const userDetailsContoller = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/user/userLogout")
const allUsers = require("../controller/user/allusers")
const updateUser = require("../controller/user/updateUser")
const getproductController = require("../controller/product/getProduct")
const UpdateProductController = require("../controller/product/updateProduct")
const UploadProductContoller = require("../controller/product/uploadProduct")
const getCategoryProduct = require("../controller/product/getCategoryProductOne")
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct")
const getProductDetails = require("../controller/product/getProductDetails")
const addToCartContoller = require("../controller/user/addToCart")
const countAddToCartproduct = require("../controller/user/countAddToCartProduct")
const addToCartViewProduct = require("../controller/user/addToCardViweProduct")
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct")
const deleteAddToCartProduct = require("../controller/user/deleteAddToProduct")
const searchProduct = require("../controller/product/searchProduct")
const filterProductController = require("../controller/product/filterProduct")




router.post("/signup",userSignUpcontroller)
router.post("/signin",userSignIncontroller)
router.get("/user-details",authToken,userDetailsContoller)
router.get("/userLogout",userLogout)


//admin panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

// Upload product

router.post("/upload-product",authToken,UploadProductContoller)
router.get("/get-product",getproductController)
router.post("/update-product",authToken,UpdateProductController)

router.get("/get-catgoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

// user add to cart
router.post("/addtocart",authToken,addToCartContoller)
router.get("/countAddToCartProduct",authToken,countAddToCartproduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)














module.exports=router