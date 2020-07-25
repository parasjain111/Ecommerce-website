const express=require('express');
const router=express.Router();
const cat=require('../models/categoryschema');

exports.create=(req,res)=>{
        console.log('jk',req.body);
        const category=new cat(req.body);
    
        category.save(function(err,user){
            if (err) {
                
                    return res.status(400).json({
                        error: errorHandler(err)
                });
            }
            res.json({user});
})
}

exports.categorybyid=(req,res,next,id)=>{
    cat.findById(id).exec(function(err,category){
        if(err || !category){
            return res.send('no category found')
        };
        
            req.category=category;
        next();
    })
}

exports.read=(req,res)=>{
    res.json(req.category);
    console.log(req.category);

}

exports.remove=(req,res)=>{
    const category=req.category;
    category.remove(function(err,del){
        if(err) throw err;
        console.log('deleted category is',del);
    })
}

exports.update=(req,res)=>{
    console.log('jk',req.body);
        const category=req.category;
        category.name=req.body.name;
        category.save(function(err,user){
          if(err) throw err;
          console.log(user);
    })
}

exports.getall=(req,res)=>{
    cat.find().exec(function(err,data){
        if(err) throw err;
        console.log(data);
        res.json(data);
    })
}