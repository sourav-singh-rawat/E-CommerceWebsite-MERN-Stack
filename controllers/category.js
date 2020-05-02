const Category = require("../models/category");

//
exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                error:"Category Doesn't exsits"
            });
        }
        req.category =category;
        next()
    });
}

//
exports.createCategory = (req,res)=>{
    const category=new Category(req.body);
    category.save((err,savedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to Creatre the category"
            });
        }
         res.json(savedCategory);
    })
}

exports.getCategory =(req,res)=>{
    //
    return res.json(req.category)
}

exports.getAllCategory =(req,res)=>{
    Category.find().exec((err,allCategories)=>{
        if(err){
            return res.status(400).json({
                error:"No Category Foud"
            });
        }
        res.json(allCategories);
    });
}

//
exports.updateCategory=(req,res)=>{
    const category=req.category
    category.name=req.body.name

    //
    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error:"Failed To Update Category"
            });
        }
         res.json(updatedCategory);
    });
}

exports.removeCategory=(req,res)=>{
    const category=req.category

    category.remove((err, category)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete Category" 
            });
        }
        res.json({
            message:`Successfull deleted ${category.name}`
        })

    });
}