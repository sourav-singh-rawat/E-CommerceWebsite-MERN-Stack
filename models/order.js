const mongoose=require("mongoose");
const { ObjectId } = mongoose.Schema;

//
const ProductInCartSchema =new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    count:Number,
    price:Number,
});

const ProductArrayInCart= mongoose.model("ProductArrayInCart",ProductInCartSchema);

const orderSchema=new mongoose.Schema({
    products:[ProductInCartSchema],
    transcation_id:{},
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]
    },
    amount:{
        type:Number
    },
    address:{
        type:String,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"User",
    },
    updateDate:Date,
},{timestamps:true});

const Order=mongoose.model("Order",orderSchema);

module.exports={Order,ProductArrayInCart};