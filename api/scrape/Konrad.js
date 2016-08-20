var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

function Job(Title, Company, Logo, Location, ComDes, ResSum, ResLi, ReqSum, Reqli, CompenSum,CompenLi, Website, PostLink, DatePosted, DateExpiry,ApplyLink,ContactName,ContactEmail,ContactPhone,ContactPosition,Type,NotExpired) {
    this.Title = Title;
    this.Company = Company;
    this.Logo= Logo;
    this.Location= Location;
    this.ComDes= ComDes;
    this.ResSum= ResSum;
    this.ResLi= ResLi;
    this.ReqSum= ReqSum;
    this.Reqli= Reqli;
    this.CompenSum= CompenSum;
    this.CompenLi= CompenLi;
    this.Website= Website;
    this.PostLink=PostLink;
    this.DatePosted= DatePosted;
    this.DateExpiry= DateExpiry;
    this.ApplyLink= ApplyLink;
    this.ContactName= ContactName;
    this.ContactEmail= ContactEmail;
    this.ContactPhone= ContactPhone;
    this.ContactPosition= ContactPosition;
    this.Type= Type; //contract/part-time/full-time
    this.NotExpired= true;
};
var jobs = [];

//module.exports =
big();
 function big() {
  request('http://www.konradgroup.com/careers', function(err,res,body){
    if(!err) {
      var length = cheerio.load(body)('div.view-content span.field-content a').length
      //console.log(length)
      cheerio.load(body)('div.view-content span.field-content a').each(function(i,j) {
        var link = cheerio.load(body)(j).attr('href')
        request(link, function(err,res,body) { //change to link
          if(!err) {
            var Company = 'Konrad'
            var ComDes = 'Konrad Group is dedicated to solving digital challenges with creative technology. We hire great people and expect great work from them. In return, we strive to create a work environment that encourages innovation, fosters teamwork, enables career advancement, and allows for personal fulfillment.'
            ComDes += '\n\nKonrad Group’s Shared Service provides finance, accounting and payroll support to the following businesses which operate in three countries, five offices, multiple currencies and two languages.'
            ComDes += '\n\nKonrad Group is a full-service digital consultancy providing digital consulting, design, and development services for our clients. Our Design-Driven Technology™ approach has delivered solutions in use by over 20 million people in 50 countries around the globe.'

            var ApplyLink = res.request.uri.href
            var Website = res.request.uri.href
            var Title = cheerio.load(body)('h1').text();
            var Location = cheerio.load(body)('li[title="Location"]').text();
            var Type = cheerio.load(body)('#resumator-job-employment').text().replace(/(\r\n|\n|\r|\s)/gm,'');
            var Reqli = (cheerio.load(body)('p:contains("Responsibilities")').next('ul').html() || '').replace(/<li>/g,'').split('</li>');
      
            console.log(Reqli)
          } else {
            console.log(err)
          }
        })
        //console.log(i, link)
      })
    } else {
      console.log(err)
    }
  })


}
