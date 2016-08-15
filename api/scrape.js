var request = require('request');
var cheerio = require('cheerio');
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
    this.NotExpired= Boolean;
};
var jobs = [];

request('https://www.freshbooks.com/careers', function(err,res,body) {
  if(!err) {
    var count = 0;

    cheerio.load(body)('section.u-wrapper').each(function(i,j) {
      if (i > 0) {
        var links = cheerio.load(body)('h3 a', this);
        for (var n = 0; n < links.length ; n++){
          // var newJob = new Job();
          var link = 'https://www.freshbooks.com' + links[n].attribs.href
          // newJob.PostLink = link;
          // console.log(newJob.PostLink);
          //looping thru lengh, for a single loop sending a request; but request is async meaning the callback even for the request will run after all the loop has finished. Callback has to wait until the loop has to finish.
           request(link, function(err,res,body) {
            // console.log(res.request.uri.href);
            var newJob = new Job();
            newJob.PostLink = res.request.uri.href;
            if (!err) {
              Title = cheerio.load(body)('h1').text();
              var p = (cheerio.load(body)('.job-description.u-text-wrap p:nth-child(1)').text().length>100) ? 1 : 2; 
              newJob.ComDes = cheerio.load(body)('.job-description.u-text-wrap p:nth-child('+p+')').text();
              console.log(newJob)
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
