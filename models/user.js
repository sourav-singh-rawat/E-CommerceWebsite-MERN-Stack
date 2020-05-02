const mongooes=require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const userSchema=new mongooes.Schema({
    name:{
        type:String,
        maxLength:32,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        maxLength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        trim:true
    },
    encyp_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0,
    },
    purchases:{
        type:Array,
        default:[],
    }
},{timestamps:true});
//

//
//

//
userSchema.virtual("password")
    .set(function(password){
        //
        this._password=password
        //
        this.salt=uuidv1();
        //
        this.encyp_password=this.securePassword(password);
    })
    .get(function(){
        //
        return this._password
    });

//
//
userSchema.methods={
    
    //
    autheicate:function(plainpassword){
        //
        //
        return this.securePassword(plainpassword)=== this.encyp_password;
    },

    securePassword:function(plainpasssword){
        //
        if(plainpasssword=="") return "";
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpasssword)
            .digest('hex');
        }catch(err){
            return "";
        }
    }
}
//

module.exports=mongooes.model("User",userSchema);