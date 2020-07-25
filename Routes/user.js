const express=require('express');
const router=express.Router();
const User=require('../models/userschema');
const {signupvalidator} =require('../Validator');
const {signup,signout,signin,requiresign,isadmin} =require('../controllers/auth');
const {userbyid,read,update,purchasehistory} =require('../controllers/User');
router.get('/',requiresign,isadmin,function(req,res){
    res.send('hello');
});

router.post('/signup',signupvalidator,signup);

router.get('/signout',signout);

router.post('/signin',signin);

router.get('/user/:userid',requiresign,read);
router.put('/user/:userid',requiresign,update);
router.get("/orders/by/user/:userid",requiresign,purchasehistory);

router.param('userid',userbyid);

module.exports=router;