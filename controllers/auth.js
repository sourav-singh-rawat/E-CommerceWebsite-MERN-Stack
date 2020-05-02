const User = require("../models/user");
const {check, validationResult} = require("express-validator")
const expressJwt=require("express-jwt")
const jwt=require("jsonwebtoken")

exports.signup=(req,res)=>{
     const errors=validationResult(req)
     if(!errors.isEmpty()){
          return  res.status(422).json({
               err:errors.array()[0].msg
          });
     }

    var user= new User(req.body);
    user.save((err,userStored)=>{
          if(err){
               return res.status(400).json({
                    err:"Not able to save user data"
               });
          }
          res.json({
               id:userStored._id,
               name:userStored.name,
               email:userStored.email
          });
    });
};

exports.singin=(req,res)=>{
     const errors=validationResult(req)
     if(!errors.isEmpty()){
          return res.status(422).json({
               err:errors
          });
     }

     const {email,password} = req.body;

     User.findOne({email},(err,user)=>{
          if(err || !user){
               return res.status(400).json({
                    err:"User Email Doesn't Exists"
               });
          }

          if(!user.autheicate(password)){
               return res.status(402).json({
                    err:"Email & Password Doesnt Match"
               });
          }

          var token= jwt.sign({id:user._id},process.env.SECURE)
          res.cookie("token",token,{expire:new Date()+999});

          const {id,name,email,role}=user;
          //
          return  res.json({token,user:{id,name,email,role}});
     });

}

exports.signout=(req, res) => {
     //
     //
     res.clearCookie("token")
     res.json({
        message:"Signout Sucessful"
     });
};


//
//
//
//
exports.isSignedin=expressJwt({
     secret:process.env.SECURE,
     
     //
     //
     //
     userProperty:"auth"
});


//
exports.isAuthenticated =(req,res,next)=>{
     //
     //
     let checker=req.profile && req.auth && req.profile._id == req.auth.id
     if(!checker){
          return res.status(403).json({
               error:"ACCESS DENIED"
          });
     }

     next();
};

exports.isAdmin =(req,res,next)=>{
     if(req.profile.role===0){
          return res.status(403).json({
               error:"You Are Not ADMIN, ACCESS DENIED"
          });
     }
     
     next();
};