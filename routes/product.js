const express=require("express");
const router=express.Router();

const {getProductById,createProduct,getProduct,getPhoto,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const {isSignedin,isAuthenticated,isAdmin} =require("../controllers/auth");
const {getUserById}=require("../controllers/user")

router.param("userId",getUserById)
router.param("productId",getProductById)

//
router.post("/product/create/:userId",isSignedin,isAuthenticated,isAdmin,createProduct);

//
router.get("/product/:productId",getProduct)

//
//
router.get("/product/photo/:productId",getPhoto)

router.delete("/product/:productId/:userId", isSignedin,isAuthenticated,isAdmin,deleteProduct);

router.put("/product/:productId/:userId", isSignedin,isAuthenticated,isAdmin,updateProduct);

//
router.get("/products",getAllProducts);

router.get("/products/categories",getAllUniqueCategories)

module.exports = router