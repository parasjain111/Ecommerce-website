const express=require('express');
const router=express.Router();
const User=require('../models/userschema');

const jwt=require('jsonwebtoken');
const expressjwt=require('express-jwt');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
   localStorage = new LocalStorage('./scratch');
 }

 exports.isadmin=(req,res,next)=>{
    var loginuser=localStorage.getItem('loginUser');
    console.log(loginuser);
    User.findOne({name:loginuser},function(err,data){
        if(err) throw err;
        console.log(data);
        if(data.role===0){
            res.send('access denied');
        }
        next();
    })
}

exports.requiresign=(req,res,next)=>{
    var usertoken=localStorage.getItem('usertoken');
    try{
        var decoded=jwt.verify(usertoken,'logintoken');
    }
    catch(err){
        res.send('no one is logges');
    }
    next();
}

exports.signup=(req,res)=>{
    console.log('jk',req.body);
    const user=new User(req.body);

    user.save(function(err,user){
      if(err) throw err;
      res.json({
        user
    });
});
}


exports.signin=(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body)
    User.findOne({email},function(err,user){
        if(err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist. Please '
        })
    }
        else{

        

        if(!user.authenticate(password)){
            return res.status(401).json({
                error: 'Incorrect password/email'
            })
        }
        else{
        const token=jwt.sign({_id:user._id},'logintoken');
        localStorage.setItem('usertoken',token);
        localStorage.setItem('loginUser',user.name);
        const {_id,name,email,role}=user;
      
        return res.json({ token, user: { _id, email, name, role } });
    }}
    })
}

exports.signout=(req,res)=>{
    localStorage.removeItem('loginuser');
    localStorage.removeItem('usertoken');

}