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
	            .otherwise({
	              redirectTo: '/home'
	            });
	});
})();
