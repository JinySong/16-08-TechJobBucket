var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	Title: String,
	Company: String,
	Logo: String,
	Location: String,
	ComDes: String,
	ResSum: String,
	ResLi: Array,
	ReqSum: String,
	Reqli: Array,
	CompenSum: String,
	CompenLi: Array,
	Website: String,
	PostLink:String,
	DatePosted: Date,
	DateExpiry: Date,
	ApplyLink: String,
	ContactName: String,
	ContactEmail: String,
	ContactPhone: String,
	ContactPosition: String,
	Type: String, //contract/part-time/full-time
	NotExpired: Boolean
})

JobSchema.pre('save', function(next) {
	var date = new Date();
	this.DatePosted = this.DatePosted || date;
	next();
});

// JobSchema.methods.summary = function() {
//     var summary = this.name + "\n" + this.email + "\nRating: " + this.address; 
//     return summary;
// };

var Job = mongoose.model('Job', JobSchema);
module.exports = Job;
