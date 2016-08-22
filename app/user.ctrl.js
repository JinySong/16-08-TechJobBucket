(function(){
	angular
		.module('TJdb')
		.controller('UserCtrl', function ($http,jobSrv,$routeParams,$location) {
		var userVm = this;

	  	userVm.email = $routeParams.Id
	  	userVm.user ='';
	  	//userVm.userJobs = [];
	  	//userVm.getUserJobs = getUserJobs;
	  	userVm.getUser = getUser;
	  	userVm.getUserJobs = getUserJobs;
		userVm.goHome = goHome;
		userVm.logOut = logOut;
		userVm.goToJob = goToJob;
		userVm.deleteJob = deleteJob;

		getUser(userVm.email);

		function getUser(email){
			//pass through email to getUser endpoint. Make sure email is passed through when this function is called
			return $http.get('/getUser/'+email).then(function(res) {
            userVm.user = res.data;
   //          for (var i=0; i<userVm.user.jobSaved.length; i++) {
   //          	//console.log(userVm.user.jobSaved[x])
			// 	$http.get('/Job/'+ userVm.user.jobSaved[i].id).then(function(res) {
			// 		console.log(i)
			// 		userVm.user.jobSaved[i-1].posting = res.data
		 //            console.log('Job Saved to User')
		 //        }, function(err) {
		 //            console.log('Job did not save to user: ', err)
		 //        })
			// }
            //userVm.userJobs = res.data.jobSaved;
          }, function(err) {
            console.log(err)
            //$location.path('/home')
          })
		}
		
		function getUserJobs(){
			
		}

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

		function goToJob(id) {
	  		$location.path('/job/'+id)
		}

		function deleteJob(jobId) {
	  		return $http.get('/deleteJob/'+localStorage.loginEmail+'/'+jobId).then(function(res) {
	            console.log('Job Saved to User');
	            location.reload();
	        }, function(err) {
	            console.log('Job did not save to user: ', err)
	        })
	  	}
	});

})();