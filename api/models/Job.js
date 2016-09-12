var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
	Title: String,
	Company: String,
	Logo: String,
	Website: String,
	Content: String,
	PostLink:String,
	DateAdded: Date,
})

JobSchema.pre('save', function(next) {
	var date = new Date();
	this.DateAdded = this.DateAdded || date;
	next();
});

// JobSchema.methods.summary = function() {
//     var summary = this.name + "\n" + this.email + "\nRating: " + this.address; 
//     return summary;
// };

var Job = mongoose.model('Job', JobSchema);
module.exports = Job;
