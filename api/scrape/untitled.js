var request = require('request');
var cheerio = require('cheerio');

big();
function big (){
  request('http://www.konradgroup.com/careers', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('div.view-content span.field-content a').length
      //console.log(length)
      cheerio.load(body)('div.view-content span.field-content a').each(function(i,j) {
        var newJob = {}
        newJob.PostLink = cheerio.load(body)(j).attr('href')
        newJob.Website = 'http://www.konradgroup.com/'
        newJob.Company = 'Konrad'
        newJob.Logo = 'http://auth.konradgroup.com/Content/images/loginLogo.png'
        newJob.Title = cheerio.load(body)(j).text()


        console.log(newJob)

    })
    }
  })
}