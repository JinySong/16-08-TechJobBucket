(function(){
	angular
		.module('TJdb')
		.controller('RegLogCtrl', function (jobSrv,$location,$http) {
		var RegLogVm = this;

		RegLogVm.goHome = goHome;
		RegLogVm.register_btn = 'Sign Up';
		RegLogVm.auth_btn = "Log In";
		RegLogVm.register = register;
		RegLogVm.authenticate = authenticate;

		function register(){
			//check passwords
			if(RegLogVm.password == RegLogVm.repassword && RegLogVm.password != ''){
				var user = {
					email:RegLogVm.email,
					password:RegLogVm.password
				}
				user = JSON.stringify(user);
				$http.post('/addUser',user)
				.then(function(res){
					console.log('registered');
					RegLogVm.register_btn = res.data.msg;
					$location.path('/home')
				})
			}
			else{
				RegLogVm.register_btn = "Passwords Don't Match";
			}
		}

		function authenticate(){
			var user = {
				email:RegLogVm.email,
				password:RegLogVm.password
			}

			user = JSON.stringify(user);
			$http.post('/authenticate',user)
			.then(function(res){
				console.log('loged in');
				localStorage.loginEmail = RegLogVm.email;
				RegLogVm.auth_btn = res.data.msg;
				$location.path('/home')
			})
		}

		function goHome(){
			$location.path('/home')
		}





	});

})();