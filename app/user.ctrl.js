(function(){
	angular
		.module('TJdb')
		.controller('UserCtrl', function (jobSrv,$routeParams,$location) {
		var userVm = this;

	  	userVm.user ='';
	  	userVm.getUser = getUser;
		userVm.goHome = goHome;

		function getUsers(){
			$http.get('/userbyE')
			.then(function(res){
				console.log(res);
				userVm.user = res.data;
			})
		}

		function goHome(){
			$location.path('/home')
		}
	});

})();