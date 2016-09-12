var request = require('request');
var cheerio = require('cheerio');

big();
function big (){
  request('https://www.freshbooks.com/careers', function(err,res,body) {
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
              

         

              console.log(newJob)
              // jobs.push(newJob)

  
            } else {
              console.log(err)
            }
          })
        }
      }   
    })
  })
}