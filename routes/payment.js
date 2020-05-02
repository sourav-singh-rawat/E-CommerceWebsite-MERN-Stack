const express = require('express');
const router=express.Router()
const {getUserById} = require("../controllers/user")
const { isSignedin,isAuthenticated} = require("../controllers/auth")
//
const {genrateToken,processTranscationToServer} = require("../controllers/payment")

router.param("userId",getUserById);

//

//

//

//
router.get("/payment/braintree/gettoken/:userId",isSignedin,isAuthenticated,genrateToken);
//
router.post("/payment/braintree/:userId",isSignedin,isAuthenticated,processTranscationToServer)

module.exports=router