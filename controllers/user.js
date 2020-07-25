const User=require('../models/userschema');
const {Order}=require('../models/order');
exports.userbyid=(req,res,next,id)=>{
    User.findById(id).exec(function(err,user){
        if(err || !user){
            res.send('no user found');
        }
        else
        {
            req.user=user;
        next();
    
    }
    })
}

exports.read=(req,res)=>{
    req.user.hashed_password=undefined;
    req.user.salt=undefined;
    res.send(req.user);
}

exports.update=(req,res)=>{
User.findByIdAndUpdate({_id:req.user._id},{$set:req.body},{new:true},(err,users)=>{
    if(err) throw err;
    console.log('successful');
res.send(users);
})
}


exports.addordertohistory=(req,res,next)=>{
    let history=[]
    req.body.order.products.forEach((item)=>{
        history.push({
            _id:item._id,
            name:item.name,
            description:item.description,
            category:item.category,
            quantity:item.quantity,
            amount:req.body.order.amount
        })
    })

    User.findOneAndUpdate({_id:req.user._id},{$push:{history:history}},{new:true},
        (err,data)=>{
            if(err){
                return res.status(400).json({
                    error:'could not update'
                });
            }
            next();
        })
}

exports.purchasehistory=(req,res)=>{
    Order.find({user:req.user._id})
    .populate('user','_id name')
    .sort('-created')
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({err})
        }
        else{
            res.json(orders);
        }
    })
}