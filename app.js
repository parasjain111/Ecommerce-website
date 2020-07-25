const express=require('express');
const app=express(); 
const mongoose=require('mongoose');
const user=require('./Routes/user');
const cookieparser=require('cookie-parser');
const cors=require('cors');
const path =require("path");
//const bodyparser=require('body-parser');
const expressValidator=require('express-validator');
const category =require('./Routes/category');
const product=require('./Routes/product');
const braintree=require('./Routes/braintree');
const morgan=require('morgan');
const order=require('./Routes/order');
const bodyparser=require("body-parser");
app.use(expressValidator());
app.use(bodyparser.urlencoded({
    
    extended: true
}));
app.use(bodyparser.json());

//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
mongoose.connect('mongodb+srv://parasdb123:parasjain111@cluster0-zafdb.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: false,
}).then(()=>{
    console.log('kjdvbskhvbwk');

});
app.use('/api',user);
app.use('/',order);
app.use('/cat',category);
app.use('/product',product);
app.use('/',braintree);

app.use(morgan('dev'));
app.use(cors());


app.use(cookieparser);


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const port=process.env.PORT||8000;

//don't forget to npm install -s path

app.use(express.static(path.resolve(__dirname, "exomer-front", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
}); 


app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})