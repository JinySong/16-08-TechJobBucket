var request = require('request');
var cheerio = require('cheerio');

big();
function big (){
  request('https://www.shopify.com/careers', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('#work-at-shopify div.page-width div.section-block.grid-container.grid-container--thirds a.body-link').length
      console.log(length)

      cheerio.load(body)('#work-at-shopify div.page-width div.section-block.grid-container.grid-container--thirds a.body-link').each(function(i,j){
        var newJob = {};
        newJob.Title = cheerio.load(body)(j).text();
        newJob.PostLink = 'https://www.shopify.com' + cheerio.load(body)(j).attr('href')
        newJob.Website = 'https://www.shopify.com'
        newJob.Company = 'Shopify'
        newJob.Logo = 'https://www.zoho.com/inventory/help/images/market-places/shopify-logo.png'
        console.log(newJob)
      })



    }
  })
}