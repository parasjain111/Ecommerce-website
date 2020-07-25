const express=require('express');
const router=express.Router();
const {signup,signout,signin,requiresign,isadmin} =require('../controllers/auth');
const {userbyid,read,update} =require('../controllers/User');
const {generatetoken,processpayment} =require('../controllers/braintree');
router.get('/braintree/gettoken/:userid',requiresign,generatetoken)
router.post('/braintree/payment/:userid',requiresign,processpayment)
router.param('userid',userbyid);


module.exports=router;