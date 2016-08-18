(function(){
	angular
		.module('TJdb')
		.controller('RegLogCtrl', function (jobSrv,$location,$http) {
		var RegLogVm = this;
		console.log('in register ctrl')
		RegLogVm.goHome = goHome;
		RegLogVm.register_btn = 'Sign Up';
		RegLogVm.auth_btn = "Log In";
		RegLogVm.register = register;
		RegLogVm.authenticate = authenticate;
		RegLogVm.msg;

		function register(){
			console.log('how many times this will run')
			//check passwords
			if(RegLogVm.password == RegLogVm.repassword && RegLogVm.password != ''){
				var user = {
					email:RegLogVm.email,
					password:RegLogVm.password
				}
				user = JSON.stringify(user);
				$http.post('/addUser',user)
				.then(function(res){
					console.log('registered please log in');
					RegLogVm.register_btn = res.data.msg;
					//$location.path('/registerLogin')
					RegLogVm.msg;
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
			var email = RegLogVm.email;

			user = JSON.stringify(user);
			$http.post('/authenticate',user)
			.then(function(res){
				console.log('loged in');
				console.log(res)
				console.log(res.config)
				console.log(res.config.data)
				console.log(res.config.data.email)

				localStorage.loginEmail = RegLogVm.email;
				RegLogVm.auth_btn = res.data.msg;
				console.log($location.path());
				$location.path('/user/'+email);
			})
		}

		function goHome(){
			$location.path('/home')
		}





	});

})();