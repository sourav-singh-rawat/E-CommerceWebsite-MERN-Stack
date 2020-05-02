const Product=require("../models/product");
//
const formidable= require("formidable")
const _ = require("lodash");
//
const fs= require("fs")


exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .exec((err,thisProduct)=>{
        if(err || !thisProduct){
            return res.status(400).json({
                error:"Product Doesn't exsits"
            });
        }
        req.product=thisProduct
        next()
    });
}

//
exports.createProduct=(req,res)=>{
    const form=new formidable.IncomingForm();
    //
    form.keepExtensions=true;

    //
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                //
                error:"Problem with image"
            });
        }


        //
        //
        const {name,description,price,category} = fields;
        if(!name || !description || !price || !category){
            return res.status(400).json({
                error:"All Fields Are Required"
            });
        }

        let product = new Product(fields);
        

        //
        //
        if(file.photo){
            if(file.photo.size > 3000000){          //
                return res.status(400).json({
                    error:"File is Too Big !"
                });
            }

            //
            product.photo.data = fs.readFileSync(file.photo.path)
            //
            product.photo.contentType = file.photo.type
        }


        //
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Saving tshirt in DB Failed"
                });
            }
            res.json(product)
        })
    })
}

//
exports.getProduct =(req,res)=>{
    //
    req.product.photo =undefined

    //
    return res.json(req.product)
}

//
//
exports.getPhoto = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }
    next();
}

exports.deleteProduct = (req,res)=>{
    let product= req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
          return res.status(400).json({
              error:"Failed to delete the product",
          });  
        }

        res.json({
            message:"Product Deleted",
            deletedProduct
        });
    });
}


//
exports.updateProduct = (req,res)=>{
    const form=new formidable.IncomingForm();
    //
    form.keepExtensions=true;

    //
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                //
                error:"Problem with image"
            });
        }


        //
        //
        let product = req.product;
        //
        //
        product = _.extend(product,fields)

        //
        //
        if(file.photo){
            if(file.photo.size > 3000000){          //
                return res.status(400).json({
                    error:"File is Too Big !"
                });
            }

            //
            product.photo.data = fs.readFileSync(file.photo.path)
            //
            product.photo.contentType = file.photo.type
        }


        //
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Updating Product Failed"
                });
            }
            res.json(product)
        })
    })
}

exports.getAllProducts=(req,res)=>{
    //
    let limit=req.query.limit ? parseInt(req.query.limit): 8;
    let shortBy= req.query.shortBy ? req.query.shortBy : "_id"

    Product.find()
    //
    //
    .select("-photo")
    //
    .limit(limit)
    //
    .sort([[shortBy,"asc"]])
    //
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"No Prduct Found"
            });
        }

         res.json(product);
    })
}

//
//
exports.updateStock = (req,res,next)=>{
    //

    //
    //
    //
    let myOperations = req.body.order.products.map(prod => {
        return {
            //
            updateOne:{
                //
                filter:{_id: prod._id},
                //
                update:{$inc:{
                            //
                            //
                              stock: -prod.count,
                              sold: +prod.count
                            }
                        }

            }
        }
    });

    //
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            console.log(err);
            //
            return res.status(400).json({
                error:"Bulk opertaion failed"
            });
        }
        next();
    })
}

//
exports.getAllUniqueCategories = (req,res)=>{
    //
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No Categorie Product Exists"
            });
        }
         res.json(categories);
    });
}