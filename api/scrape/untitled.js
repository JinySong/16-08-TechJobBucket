var request = require('request');
var cheerio = require('cheerio');

big();
function big (){
  request('https://unata.com/careers/', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('div.o-grid.-bottom.-margin a.c-career_link').text()
      console.log(length)

      cheerio.load(body)('div.o-grid.-bottom.-margin a.c-career_link').each(function(i,j){
        var newJob = {};
        newJob.Title = cheerio.load(j)('h2').text();
        newJob.PostLink = cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://unata.com/'
        newJob.Company = 'Unata'
        newJob.Logo = 'https://gust-production.s3.amazonaws.com/uploads/startup/logo_image/52084/logo.png'
        console.log(newJob)
      })



    }
  })
}