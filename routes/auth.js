const express = require('express');
const router = express.Router();

const {check, validationResult} = require("express-validator")

//
//
const { signout, signup,singin,isSignedin}=require("../controllers/auth");

router.post('/singup',[
    
    check("email","use proper email").isEmail(),
    check("password").isLength({min:3}).withMessage("Password should be more then 3 leters") 
], signup);

router.post("/singin",[
    check("email").isEmail().withMessage("Use Your Authenticated Email"),
    check("password").isLength({min:3}).withMessage("Password Was more then 3 length")
],singin);

router.get('/signout', signout);

//
//
//

//
module.exports=router;