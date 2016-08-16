(function(){
	angular
		.module('TJdb', ['ngRoute'])
		.config(function($routeProvider) {
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
	              controller: 'JobDetailsCtrl as ctrl'
	            })
	            .when('/user/:Id', {
	              templateUrl: 'user.html',
	              controller: 'UserCtrl as ctrl'
	            })
	            .when('/registerLogin', {
	              templateUrl: 'registerLogin.html',
	              controller: 'RegLogCtrl as ctrl'
	            })
	            .otherwise({
	              redirectTo: '/home'
	            });
	});
})();
