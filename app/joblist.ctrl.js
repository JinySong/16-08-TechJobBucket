(function(){
	angular
		.module('TJdb')
		.controller('JobListCtrl', function (jobSrv, $location,$window,$http) {
		var joblVm = this;

	 	joblVm.jobs = jobSrv.getJobs();
	  
	  	joblVm.sortOptions = [
		    {label: 'Position', sortField: 'Title', reverse: false},
		    {label: 'Company', sortField: "Company", reverse: true}
		]

		joblVm.sortSelect = joblVm.sortOptions[0];

		joblVm.goToJob = goToJob;
		joblVm.goToSignUp = goToSignUp;
		joblVm.goToApply = goToApply;
		joblVm.saveJob = saveJob;
		
	  	function goToJob(id){
	  		$location.path('/job/'+id)
	  	}

	  	function goToSignUp() {
	  		console.log('hi')
	  		$location.path('/registerLogin')
	  	}

	  	function goToApply(id){
	  		for (var i=0; i<joblVm.jobs.length; i++) {
	  			if (joblVm.jobs[i]._id == id) {
	  				$window.location.href=joblVm.jobs[i].ApplyLink;
	  			}
	  		}
		}
		//test this
	  	function saveJob(jobId) {
	  		return $http.get('/saveLink/'+localStorage.loginEmail+'/'+jobId).then(function(res) {
	            console.log('Job Saved to User')
	        }, function(err) {
	            console.log('Job did not save to user: ', err)
	        })
	  	}


	});

	
})();
