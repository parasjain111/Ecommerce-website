const express=require('express');
const router=express.Router();
const User=require('../models/userschema');
const formidable=require('formidable');
const _=require('lodash');
const fs=require('fs');
const Product=require('../models/productschema');
const Category =require('../models/categoryschema');
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    console.log('erf');
    console.log(form);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if(err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.productbyid=(req,res,next,id)=>{
    Product.findById(id).populate('category').exec(function(err,product){
        if(err || !product){
            return res.send('no product found')
        };
        
            req.product=product;
        next();
    })
}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.remove=(req,res)=>{
    const product=req.product;
    product.remove(function(err,del){
        if(err) throw err;
        console.log('deleted product is',del);
    })
}

exports.update=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        let product = req.product;
        product=_.extend(product,fields);

        if(files.photo){
            product.photo.data=fs.readFileSync(files.photo.path);
            product.photo.contentType=files.photo.type;
        }
        product.save(function(err,result){
            if(err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        })

    })
}

exports.list=(req,res)=>{
    let order=req.query.order ? req.query.order:'asc';
    let sortBy=req.query.sortBy ? req.query.sortBy:'_id';
    let limit=req.query.limit ? parseInt(req.query.limit):50;
    Product.find()
    .select("-photo")
    .populate('category')
    .sort([[sortBy,order]])
    .limit(limit)
    .exec(function(err,data){
        if(err) throw err;
        res.send(data);
    })
}

exports.related=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit):2;
    Product.find({_id:{$ne:req.product},category:req.product.category})
    .select("-photo")
    .limit(limit)
    .populate('category')
    .exec(function(err,data){
        if(err) throw err;
        res.send(data);
    })

}

exports.listcategories=(req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            res.send("product not found");

        }
        res.json(categories);
    })
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set('Contemt-Type',req.product.photo.contentType);
        res.send(req.product.photo.data);
    }
    next();
}

exports.listBySearch = (req, res) => {
    console.log('fre');
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                data
            });
        });
};


exports.listsearch=(req,res)=>{
    console.log('enter');
    console.log(req.query.category);
    const query={};
    if(req.query.search){
        query.name={$regex:req.query.search,$options:'i'}
    }
        if(req.query.category && req.query.category!='All'){
           Category.findById(req.query.category).exec(function(err,cat){
            query.category=cat.name;
           } );
        }
        console.log(query);
        Product.find(query,(err,product)=>{
            
            if(err){
                return res.status(400).json({
    error:errorHandler(err)
}) 
           }
           res.json(product);
        }).select('-photo');
    }


    exports.decreasequantity=(req,res,next)=>{
        let bulkops=req.body.order.products.map((item)=>{
            return {
                updateOne:{
                filter:{_id:item._id},
                update:{$inc:{quantity:-item.count,sold:+item.sold}}
            }}
        })

        Product.bulkWrite(bulkops,{},(error,products)=>{
            if(error){
                return res.status(400).json({
                    error:'not updted'
                })
            }
            next();
        })
    }