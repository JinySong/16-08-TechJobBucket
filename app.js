var Job = require('./models/Job');
var Company = require('./models/Company');
var User = require('./models/User');

var allJob;
models.Job.findAll().then(function(x){
	allJob = x;
});
//resolve this??

var newJob = {};

function create(newJob) {
	models.Job.create(newJob).then(function(x) {
		console.log(x);
	});
};

function update(jobId, newJob) {
	models.Job.find({where:{id:jobId}}).then(function(x){
		x.updateAttributes({
			for (y in x) {
				// y: newJob.y
				// x.y = newJob.y
			}
			// positionTitle: newJob.positionTitle,
			// companyName: newJob.,
			// location: newJob.,
			// companyDescription: newJob.,
			// responsibilitiesSummary: newJob.,
			// responsibilitiesBullets: newJob.,
			// requirementsSummary: newJob.,
			// requirementsBullets: newJob.,
			// compensationBenefitsSummary: String,
			// compensationBenefitsBullets: Array,
			// companyWebsite: String,
			// postingLink:String,
			// datePosted: Date,
			// dateExpiry: Date,
			// contactName: String,
			// contactEmail: String,
			// contactPhone: String,
			// contactPosition: String,
			// type: String, //contract/part-time/full-time
			// notExpired: Boolean
		})
	})
}

function deleteAll() {
	models.Job.findAll().then(function(x) {
		x.destroy();
	});
};
