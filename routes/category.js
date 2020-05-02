const express = require('express');
const router= express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require("../controllers/category")
const {getUserById} = require("../controllers/user")
const { isSignedin,isAuthenticated,isAdmin} = require("../controllers/auth")

router.param("userId",getUserById);

router.param("categoryId",getCategoryById);

//
router.post("/category/create/:userId",isSignedin,isAuthenticated,isAdmin,createCategory);

router.get("/category/:categoryId",getCategory);

router.get("/categories",getAllCategory);

//
router.put("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,updateCategory);

router.delete("/category/:categoryId/:userId",isSignedin,isAuthenticated,isAdmin,removeCategory);


module.exports = router;