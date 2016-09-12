var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

var jobs = [];
// asdf();
// function asdf() {
module.exports = function () {
    request('https://unata.com/careers/', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('div.o-grid.-bottom.-margin a.c-career_link').length
      // console.log(length)

      cheerio.load(body)('div.o-grid.-bottom.-margin a.c-career_link').each(function(i,j){
        var newJob = {};
        newJob.Title = cheerio.load(j)('h2').text();
        newJob.PostLink = cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://unata.com/'
        newJob.Company = 'Unata'
        newJob.Logo = 'https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/52084/logo.png'


              jobs.push(newJob)

              //add to DB
              Job.find({Title: newJob.Title, Company: newJob.Company}, function(err, user) {
                console.log(user)
                if(err) {
                  console.log(err)
                } else if (user.length==0) {
                  console.log('no user');
                  Job(newJob).save(function(err){
                    if(err){
                      console.log(err);
                    }
                    else{
                      console.log('job added');

                    }
                  })
                } else {
                  console.log('record exists');
                }
              })  

              var done = true;

              for (var i=0; i<length; i++){
                if (!!jobs[i]==!1) {
                  done =false;
                }
              }

              if (done) {
                console.log('Unata done');
                console.log(jobs);
                return jobs;

                
              } else {
                //console.log(n);
              }
        
      
       
    })
  } else {
    console.log(err);
  };
});
};

