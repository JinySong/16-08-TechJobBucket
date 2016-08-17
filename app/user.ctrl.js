(function(){
	angular
		.module('TJdb')
		.controller('UserCtrl', function ($http,jobSrv,$routeParams,$location) {
		var userVm = this;

	  	userVm.user ='';
	  	userVm.email = $routeParams.Id
	  	userVm.getUser = getUser;
		userVm.goHome = goHome;

		function getUser(email){
			//pass through email to getUser endpoint. Make sure email is passed through when this function is called
			return $http.get('/getUser/'+email).then(function(res) {
            userVm.user = res.data;
            console.log(res.data)
          }, function(err) {
            console.log(err)
            //$location.path('/home')
          })
		}
		//login email matches the encrypted authToken's email
		getUser(userVm.email);

		function goHome(){
			$location.path('/home')
		}

		function logOut() {
			localStorage.removeItem('authToken');
			console.log(authToken);
			$location.path('/home');
		}
	});

})();