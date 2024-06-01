var mongoose = require('mongoose');
var bycrypt = require('bcrypt');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'username' : String,
	'email' : String,
	'password' : String,
    'image': String,
    'enabled2fa' : {
        type: Boolean,
        default: false
    }
    //'fcmToken' : String
});

userSchema.pre('save', async function(next){
    try{
        const hash = await bycrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
    catch(err){
        next(err);
    }
});


userSchema.statics.authenticate = async function(username, password) {
    try{
        const user = await this.findOne({ username }).exec();
        if(!user){
            const err = new Error('User not found');
            err.status = 401;
            throw err;
        }
        const result = await bycrypt.compare(password, user.password);
        if(result === true){
            return user;
        }
        else{
            throw new Error('Incorrect password');
        }
    }
    catch(err){
        throw err;
    }
        
};

var User = mongoose.model('user', userSchema);
module.exports = User;
