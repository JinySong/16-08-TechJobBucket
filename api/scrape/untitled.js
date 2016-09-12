var request = require('request');
var cheerio = require('cheerio');

big();
function big (){
  request('https://boards.greenhouse.io/embed/job_board?for=varagesale&b=https://www.varagesale.com/jobs', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('a').length


      cheerio.load(body)('a').each(function(i,j){
        var newJob = {};
        newJob.Title = cheerio.load(body)(j).text();
        newJob.PostLink = cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://www.varagesale.com/'
        newJob.Company = 'VarageSale'
        newJob.Logo = 'http://www.acfb.org/sites/default/files/media/varage-sale-logo.png'
        console.log(newJob)
      })








    }
  })
}