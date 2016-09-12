var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

var jobs = [];

module.exports = function () {
request('https://www.freshbooks.com/careers', function(err,res,body) {
  if(!err) {
    var count = 0;

    cheerio.load(body)('section.u-wrapper').each(function(i,j) {
      if (i > 0) {
        var links = cheerio.load(body)('h3 a', this);
        for (var n = 0; n < links.length ; n++){
          var newJob = {};
          newJob.PostLink = 'https://www.freshbooks.com' + links[n].attribs.href
          newJob.Company = 'Freshbooks';
          newJob.Logo = 'http://www.cheqroom.com/wp-content/files/freshbooks-logo.png';
          newJob.Website = 'https://www.freshbooks.com'

          request(newJob.PostLink, function(err,res,body) {
            if (!err) {
              newJob.Title = cheerio.load(body)('h1').text();

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

              for (var i=0; i<n; i++){
                if (!!jobs[i]==!1) {
                  done =false;
                }
              }

              if (done) {
                console.log('freshbooks done');
                //console.log(jobs);
                return jobs;

                
              } else {
                //console.log(n);
              }
            } else {
              console.log(err)
            }
          })
        }
      }
       
    })
  } else {
    console.log(err);
  };
});
};

