(function(){
	angular
		.module('TJdb')
		.controller('JobDetailsCtrl', function (jobSrv,$routeParams,$location,$sce) {
		var jobdVm = this;

	  	jobdVm.job = jobSrv.getJob($routeParams.Id)
		jobdVm.goHome = goHome;
		jobdVm.url = jobdVm.job.PostLink;

		function goHome(){
			$location.path('/home')
		}
	});

})();
