const express=require('express');
const router=express.Router();
const User=require('../models/userschema');

const {userbyid} =require('../controllers/user');
const {categorybyid,create,read,remove,update,getall}=require('../controllers/category');

const cat=require('../models/categoryschema');

const {requiresign,isadmin} =require('../controllers/auth');


router.post('/:userid/create',create);
router.get('/:categoryid',read)
router.delete('/:categoryid/:userid',requiresign,isadmin,remove);
router.put('/:categoryid/:userid',requiresign,isadmin,update);
router.get('/getall/categories',getall);
router.param('userid',userbyid);
router.param('categoryid',categorybyid);

module.exports=router;