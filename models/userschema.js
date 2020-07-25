const mongoose=require('mongoose');
const crypto=require('crypto');
const uuidv1=require('uuid/v1');    
mongoose.connect('mongodb://localhost:27017/ecomer');
const userschema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        //required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        //required:true,
        maxlength:32

    },
    hashed_password:{
        type:String,
        //required:true
    },
    about:{
        type:String,
        trim:true
    },
    salt:String ,
    role:{
    
            type:Number,
            default:0

        },

    history:{
        type:Array,
        default:[]
    }

},
{ timestamps: true }

);


userschema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userschema.methods = {
    authenticate: function(plainText) {
        console.log(this.encryptPassword(plainText));
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model('User', userschema);
