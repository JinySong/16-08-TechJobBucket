(function(){
	angular
		.module('TJdb')
		.controller('RegLogCtrl', function (jobSrv,$location) {
		var RegLogVm = this;

		RegLogVm.goHome = goHome;

		function goHome(){
			$location.path('/home')
		}
	});

})();