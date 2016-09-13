var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

var jobs = [];
// asdf();
// function asdf() {
module.exports = function () {
    request('https://slack.com/jobs', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('div.card.postings a.posting_title').length
      //console.log(length)

      cheerio.load(body)('div.card.postings a.posting_title').each(function(i,j){
        var newJob = {};
        newJob.Title = cheerio.load(j)('h4').text();
        newJob.PostLink = 'https://slack.com' + cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://slack.com'
        newJob.Company = 'Slack'
        newJob.Logo = 'http://kpcbweb2.s3.amazonaws.com/companies/542/logo/original/slack-logo_large.png?1415320446'


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
                console.log('Slack done');
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

