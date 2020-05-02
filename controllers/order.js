const {Order,ProductArrayInCart} = require("../models/order")

exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    //
    .populate("products.product","name price")
    .exec((err,thisOrder)=>{
        if(err || !thisOrder){
            return res.status(400).json({
                error:"No Order with this ID Found in DB"
            });
        }
        req.order=thisOrder
        next();
    })
}

exports.createOrder = (req,res)=>{
    //
    //
    req.body.order.user=req.profile
    //
    const order=new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Order Not Saved into DB"
            });
        }
         res.json(order);
    })
}

exports.getAllOrders = (req,res)=>{
    Order.find()
    //
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:"No Order Found In DB"
            });
        }

         res.json(orders);
    })
}

exports.getOrderStatus =(req,res)=>{
    return (Order.schema.path("status").enumValues);
}

exports.updateOrderStatus = (req,res)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Order Failed To Update"
                });
            }
             res.json(order);
        }
    )
}