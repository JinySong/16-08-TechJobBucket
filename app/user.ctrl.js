(function(){
	angular
		.module('TJdb')
		.controller('UserCtrl', function ($http,jobSrv,$routeParams,$location) {
		var userVm = this;

	  	userVm.email = $routeParams.Id
	  	userVm.user ='';
	  	userVm.userJobs = [];
	  	//userVm.getUserJobs = getUserJobs;
	  	userVm.getUser = getUser;
		userVm.goHome = goHome;
		userVm.logOut = logOut;

		getUser(userVm.email);
		function getUser(email){
			//pass through email to getUser endpoint. Make sure email is passed through when this function is called
			return $http.get('/getUser/'+email).then(function(res) {
            userVm.user = res.data;
            userVm.userJobs = res.data.jobSaved;
            console.log(res.data)
          }, function(err) {
            console.log(err)
            //$location.path('/home')
          })
		}
		
		// function getUserJobs(){
		// 	for (x in userVm.user.jobSaved) {
		// 		$http.get('/saveLink/'+localStorage.loginEmail+'/'+JobId).then(function(res) {
		//             console.log('Job Saved to User')
		//         }, function(err) {
		//             console.log('Job did not save to user: ', err)
		//         })
		// 	}
		// }

		function goHome(){
			$location.path('/home')
		}

		function logOut() {
			console.log(localStorage.authToken)
			console.log('removing')
			localStorage.removeItem('authToken');
			console.log(!!localStorage.authToken);
			$location.path('/home');
		}
	});

})();