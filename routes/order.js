const express= require("express")
const router=express.Router();

const {getOrderById,createOrder, getAllOrders, getOrderStatus, updateOrderStatus} = require("../controllers/order");
const {isSignedin,isAuthenticated,isAdmin}= require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require("../controllers/product")

router.param("userId",getUserById);
router.param("orderId",getOrderById);

router.post("/order/create/:userId", isSignedin, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);

router.get("/orders/all/:userId",isSignedin,isAuthenticated,isAdmin,getAllOrders);

//
router.get("/order/status/:userId",isSignedin,isAuthenticated,isAdmin,getOrderStatus)

router.put("/order/:orderId/status/:userId",isSignedin,isAuthenticated,isAdmin,updateOrderStatus)


module.exports = router