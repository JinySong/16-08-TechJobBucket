var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

var jobs = [];
// asdf();
// function asdf() {
module.exports = function () {
  request('http://www.konradgroup.com/careers', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('div.view-content span.field-content a').length
      //console.log(length)
      cheerio.load(body)('div.view-content span.field-content a').each(function(i,j) {
        var newJob = {}
        newJob.PostLink = cheerio.load(body)(j).attr('href')
        newJob.Website = 'http://www.konradgroup.com/'
        newJob.Company = 'Konrad'
        newJob.Logo = 'http://www.konradgroup.com/sites/all/themes/kg/img/kglogo_black.svg'
        newJob.Title = cheerio.load(body)(j).text()


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
                console.log('freshbooks done');
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

