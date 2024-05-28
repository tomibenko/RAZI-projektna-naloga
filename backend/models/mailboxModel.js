var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var mailboxSchema = new Schema({
	'id_pk' : { type: Number, unique: true, index: true },
	'location' : String,
	'status' : String,
	'size' : String,
	'owner' : {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'accessCode' : String,
	'installationDate' : Date,
	'usageHistory' : [{
		user : {
			type: Schema.Types.ObjectId,
			ref: 'user'
		},
		timestamp : {
			type: Date, 
			default: Date.now
		},
		success: {
			type: Boolean,
			default: false
		}
	}],
	'batteryStatus' : String
});

module.exports = mongoose.model('mailbox', mailboxSchema);
