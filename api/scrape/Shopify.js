var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

var jobs = [];
// asdf();
// function asdf() {
module.exports = function () {
    request('https://www.shopify.com/careers', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('#work-at-shopify div.page-width div.section-block.grid-container.grid-container--thirds a.body-link').length
      //console.log(length)

      cheerio.load(body)('#work-at-shopify div.page-width div.section-block.grid-container.grid-container--thirds a.body-link').each(function(i,j){
        var newJob = {};
        newJob.Title = cheerio.load(body)(j).text();
        newJob.PostLink = 'https://www.shopify.com' + cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://www.shopify.com'
        newJob.Company = 'Shopify'
        newJob.Logo = 'https://www.zoho.com/inventory/help/images/market-places/shopify-logo.png'


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
                console.log('Shopify done');
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

