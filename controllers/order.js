const {Order,CartItem}=require('../models/order');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
var nodemailer=require('nodemailer');

exports.create = (req, res) => {
    console.log(req.user);
    req.body.order.user=req.user
    const order=new Order(req.body.order)
    order.save((err,data)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
      
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        NODE_TLS_REJECT_UNAUTHORIZED = "0";
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'noreply.shopify000@gmail.com',
                   pass: 'parasjain111'
               },
               tls: {
                rejectUnauthorized: false
            }
           });

           const mailOptions = {
            from: 'noreply@ecommerce.com', // sender address
            to: order.user.email, // list of receivers
            subject: 'Subject of your email', // Subject line
            html:`
             <h1>Hey ${req.user.name}, Thank you for shopping with us.</h1>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Thank your for shopping with us.</p>
        `
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if(error)
              console.log(error)
            else
              console.log(info);
         });
       
        // email to buyer
        
       
        res.json(data);
        
    });
};




exports.listorders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error:'could not update'
                });
            };
            console.log(orders);
            res.json(orders);
        });
};

exports.delall=(req,res)=>{
    Order.remove().exec(function(err){
        if(err) throw err;

    
    
        console.log('dren');
    })
}

exports.getstatus=(req,res)=>{
    res.json(Order.schema.path("status").enumValues)
}
exports.orderbyid=(req,res,next,id)=>{
    Order.findById(id)
    .populate('product.product','name price')
    .exec((err,order)=>{
        if(err) {
            return res.status(400).json({
                err
            })
        }
        req.order=order;
    })
    next();
}

exports.updatestatus=(req,res)=>{
    Order.updateOne({_id:req.body.orderid},{$set:{status:req.body.status}},(err,order)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json(order);
    })
}