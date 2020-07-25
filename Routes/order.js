const express=require('express');
const router=express.Router();
const {signup,signout,signin,requiresign,isadmin} =require('../controllers/auth');
const {userbyid,read,update,addordertohistory} =require('../controllers/User');
const {generatetoken,processpayment} =require('../controllers/braintree');
const {decreasequantity} =require('../controllers/product');
const {create,listorders,delall,getstatus,updatestatus,orderbyid}=require('../controllers/order');

router.post('/order/create/:userid',requiresign,addordertohistory,decreasequantity,create);
router.get('/order/list/:userid',requiresign,isadmin,listorders)
router.get('/order/status-values/:userid',requiresign,isadmin,getstatus)
router.put('/order/:orderid/status/:userid',requiresign,isadmin,updatestatus)
router.get('/delall/del/del',delall);
router.param('userid',userbyid);
router.param('orderid',orderbyid);

module.exports=router;