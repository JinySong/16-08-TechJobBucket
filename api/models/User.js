var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		min: 6
	},
	name: String,
	address: String,
	jobSaved: Array,
	cosSaved: Array,
	created_at: Date,
	updated_at: Date,
});

UserSchema.pre('save', function(next) {
	var date = new Date();
	this.updated_at = date;
	this.created_at = this.created_at || this.updated_at;
	next();
});

UserSchema.methods.summary = function() {
    var summary = this.name + "\n" + this.email + "\nRating: " + this.address; 
    return summary;
};

var User = mongoose.model('User', UserSchema);
module.exports = User;