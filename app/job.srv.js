(function(){
    
    angular
        .module('TJdb')
        .service('jobSrv', function($http) {
        var self = this;
        
        self.jobs = [];
        self.getJobs = getJobs;
        self.getJob = getJob;
        self.getFromServer = getFromServer;

        function getJobs(){
          return self.jobs;
        };

        function getJob(id){
          return self.jobs.filter(function(job) {return job._id === id})[0];
        };

        function getFromServer(){
          return $http.get('/jobDB').then(function(res) {
            self.jobs = res.data;
          }, function(err) {
            console.log(err)
          })
        }
    });

    

    
})();
