(function(){
	angular
		.module('TJdb')
		.controller('UserCtrl', function (jobSrv,$routeParams,$location) {
		var userVm = this;

	  	//userVm.user = jobSrv.getJob($routeParams.Id)
		userVm.goHome = goHome;

		function goHome(){
			$location.path('/home')
		}
	});

})();