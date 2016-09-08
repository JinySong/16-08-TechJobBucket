(function(){
	'use strict';
	angular
		.module('TJdb', ['ngRoute', 'angular-jwt'])
		.constant('HOST_BASE_URL', 'http://localhost:8080')
		.config(function($routeProvider, $httpProvider) {
			$routeProvider
	            .when('/home', {
	              templateUrl: 'jobList.html',
	              controller: 'JobListCtrl as ctrl',
	              resolve: {
	              	job: function (jobSrv) {
	              		return jobSrv.getFromServer();
	              	}
	              }
	            })
	            .when('/job/:Id', {
	              templateUrl: 'jobDetails.html',
	              controller: 'JobDetailsCtrl as ctrl',
	              resolve: {
	              	job:function(jobSrv){
	              		return jobSrv.getJob()
	              	}
	              }
	            })
	            .when('/user/:Id', {
	              templateUrl: 'user.html',
	              controller: 'UserCtrl as ctrl',
	              resolve:{
					user:function($location, $q,$timeout, $route){
						// console.log('user resolve')
						// console.log(window.location.hash.split('/')[2])
						// console.log(localStorage.loginEmail)
						if(!localStorage.authToken || localStorage.loginEmail != $route.current.params.Id){
								console.log('redirect')
								$timeout(function(){
									$location.path('/registerLogin')
								},0)
								return $q.reject;
							}
						}
						
					}
	            })
	            .otherwise({
	              redirectTo: '/home'
	            });

	    $httpProvider.interceptors.push(function(jwtHelper){
				return{
					request:function(config){
						// console.log('Requests');
						// console.log(config);
						if(localStorage.authToken != undefined){
							config.headers.authentication = localStorage.authToken;
						}
						return config;
					},
					response:function(response){
						//console.log('Response');
						var auth_token = response.headers('authentication');
						//console.log(auth_token);
						if(auth_token){
							var decrypt_token = jwtHelper.decodeToken(auth_token);
							console.log(decrypt_token);
							if(decrypt_token.email){
								localStorage.authToken = auth_token;
							}
						}
						return response;
					}
				}
			})
	});
})();
