(function(){
	angular
		.module('TJdb')
		.controller('JobDetailsCtrl', function (jobSrv,$routeParams,$location) {
		var jobdVm = this;

	  	jobdVm.job = jobSrv.getJob($routeParams.Id)
		jobdVm.goHome = goHome;

		function goHome(){
			$location.path('/home')
		}
	});

})();
