(function(){
	angular
		.module('TJdb')
		.controller('JobListCtrl', function (jobSrv, $location) {
		var joblVm = this;

	 	joblVm.jobs = jobSrv.getJobs();
	  
	  	joblVm.sortOptions = [
		    {label: 'Position', sortField: 'Title', reverse: false},
		    {label: 'Company', sortField: "Company", reverse: true}
		]

		joblVm.sortSelect = joblVm.sortOptions[0];

		joblVm.goToJob = goToJob;

	  	function goToJob(id){
	  		$location.path('/job/'+id)
	  	}


	});

	
})();
