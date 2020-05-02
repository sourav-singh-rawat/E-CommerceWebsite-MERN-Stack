const mongooes = require("mongoose");

const categorySchema=new mongooes.Schema({
    name:{
        type:String,
        maxlength:32,
        trim:true,
        required:true,
        unique:true
    }
},{timestamps:true});

module.exports=mongooes.model("Category",categorySchema);