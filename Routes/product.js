const formidable=require('formidable');
const _=require('lodash');
const fs=require('fs');
const Product=require('../models/productschema');
const express=require('express');
const router=express.Router();
const {userbyid} =require('../controllers/user');
const {create,productbyid,read,remove,listsearch,update,list,related,listcategories,photo,listBySearch} =require('../controllers/product');
const {requiresign,isadmin} =require('../controllers/auth');
router.post('/:userid/create',create);
router.get('/:productid',read);
router.get('/list/all',list);
router.get('/related/:productid',related);
router.get('/productlist/categories',listcategories);
router.get('/photo/of/:productid',photo);
router.post('/by/search',listBySearch);
router.get('/list/search',listsearch);
router.delete('/:productid/:userid',requiresign,isadmin,remove);
router.put('/:productid/:userid',requiresign,isadmin,update);
router.param('productid',productbyid);

router.param('userid',userbyid);
module.exports=router;
 