var request = require('request');
var cheerio = require('cheerio');

big();
function big (){
  request('http://jobs.jobvite.com/top-hat', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('td.jv-job-list-name a').length
      console.log(length)


      cheerio.load(body)('td.jv-job-list-name a').each(function(i,j) {
        var newJob = {};
        newJob.Title = cheerio.load(body)(j).text();
        newJob.PostLink = 'https://jobs.jobvite.com'+ cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://tophat.com/'
        newJob.Company = 'TopHat'
        newJob.Logo = 'https://corp-cdn.tophat.com/wp-content/themes/corporate-wp-theme-newui/dist/images/tophat-logo-blue.svg'
        console.log(newJob)
      })




    }
  })
}