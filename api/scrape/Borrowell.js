var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

var jobs = [];
// asdf();
// function asdf() {
module.exports = function () {
    request('https://borrowell.workable.com/', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('h2 a').length
      // console.log(length)

      cheerio.load(body)('h2 a').each(function(i,j){
        var newJob = {};
        newJob.Title = cheerio.load(body)(j).text();
        newJob.PostLink = 'https://borrowell.workable.com' + cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://www.borrowell.com/'
        newJob.Company = 'Borrowell'
        newJob.Logo = 'http://cdn.crowdfundinsider.com/wp-content/uploads/2014/12/Borrowell-Logo.png'


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
                console.log('Borrowell done');
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

