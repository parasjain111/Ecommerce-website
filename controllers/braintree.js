const User=require('../models/userschema');
const braintree=require('braintree');

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '76pb5vxtsk3xfq9s',
    publicKey:    'yysps8ywmdzhpdxy',
    privateKey:   '72d36c975195b2dfe73bc0f04edef58f'
});

exports.generatetoken=(req,res)=>{
    gateway.clientToken.generate({}, function(err, response) {
        if (err) {
            res.send(err);
        } else {
            res.send(response);
        }
    });
}
exports.processpayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
