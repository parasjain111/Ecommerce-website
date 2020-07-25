const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecomer');
const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true
    }
},{timestamps:true}
);

module.exports=mongoose.model('category',categoryschema)