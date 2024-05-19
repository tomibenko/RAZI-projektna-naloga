var mongoose = require('mongoose');
var bycrypt = require('bcrypt');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'username' : String,
	'email' : String,
	'password' : String
});

userSchema.pre('save', function(next) {
	var user = this;
	bycrypt.hash(user.password, 10, function(err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

userSchema.statics.authenticate = async function(username, password) {
    try {
        const user = await this.findOne({ username: username, password: password});
        if (!user) {
            throw new Error('User not found.');
        }
        const result = await bcrypt.compare(password, user.password);
        if (result === true) {
            return user;
        } else {
            throw new Error('Incorrect password.');
        }
    } catch (err) {
        throw err;
    }
};

module.exports = mongoose.model('user', userSchema);
