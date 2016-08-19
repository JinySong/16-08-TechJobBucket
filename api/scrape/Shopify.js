var request = require('request');
var cheerio = require('cheerio');
var Job = require('./../models/Job');

function Job(Title, Company, Logo, Location, ComDes, ResSum, ResLi, ReqSum, Reqli, CompenSum,CompenLi, Website, PostLink, DatePosted, DateExpiry,ApplyLink,ContactName,ContactEmail,ContactPhone,ContactPosition,Type,NotExpired) {
    this.Title = Title;
    this.Company = 'Shopify';
    this.Logo= 'https://www.zoho.com/inventory/help/images/market-places/shopify-logo.png';
    this.Location= Location;
    this.ComDes= 'Over the next 10 years, the way retail works will change at a fundamental level. Every store will need an ecommerce website. Customers will expect options of where and how to buy: in-store or online, delivered or for pick-up. It’s an incredibly exciting time for this industry, and we’re going to be right at the centre of it. \nThe opportunity to shape how retail works all over the world is in our hands. We have a huge playground to work with, and we’ve already proven that we can move faster than anyone else. But right now we’re only part of the way there. To truly change the future of commerce, we need your help.';
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

//
module.exports =  function () {
    request('https://www.shopify.com/careers', function(err,res,body) {
      if (!err) {
        var count =0;
        cheerio.load(body)('#work-at-shopify div.page-width div.section-block.grid-container.grid-container--thirds').each(function(i,j) {
          var length = cheerio.load(body)('a.body-link',this).length;
          var a = cheerio.load(body)('a.body-link',this);
          for (var i=0; i<length; i++) { //change to length
            var links = 'https://www.shopify.com' + a[i].attribs.href
              request(links, function(err,res,body) { //change to links
                if(!err) {
                  var newJob = new Job();
                  newJob.Website = res.request.uri.href;
                  newJob.Title = cheerio.load(body)('h1').text();
                  newJob.Location = cheerio.load(body)('.career-description p.heading--4').text();
                  newJob.ResSum = cheerio.load(body)('.career-description p:nth-child(4)').text() + '\n\n'+ cheerio.load(body)('.career-description p:nth-child(5)').text();
                  newJob.ResLi = (cheerio.load(body)('.career-description ul:nth-of-type(1)').html() + cheerio.load(body)('.career-description ul:nth-of-type(2)').html() || '').replace(/<li>/g,'').replace(/(\r\n|\n|\r)/gm,'').replace(/<\/li>/g,'xxx').split('xxx');
                  newJob.ApplyLink = cheerio.load(body)('p.career-actions__apply a.marketing-button').attr('href')
                  newJob.Company = 'Shopify';
                  newJob.Logo= 'https://www.zoho.com/inventory/help/images/market-places/shopify-logo.png';
                  newJob.ComDes= 'Over the next 10 years, the way retail works will change at a fundamental level. Every store will need an ecommerce website. Customers will expect options of where and how to buy: in-store or online, delivered or for pick-up. It’s an incredibly exciting time for this industry, and we’re going to be right at the centre of it. \nThe opportunity to shape how retail works all over the world is in our hands. We have a huge playground to work with, and we’ve already proven that we can move faster than anyone else. But right now we’re only part of the way there. To truly change the future of commerce, we need your help.';
    
                  jobs.push(newJob)
                  //console.log(newJob)

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
                          //console.log('job added');

                        }
                      })
                    } else {
                      console.log('record exists');
                    }
                  })  

                  var done = true;

                  for (var j=0; j<i; j++){
                    if (!!jobs[j]==!1) {
                      done =false;
                    }
                  }
                  if (done) {
                    console.log('Shopify done');
                    //console.log(jobs);
                    return jobs; 
                  }



                } else {
                  //console.log(err)
                }
                
              })

            
          }
        })
          
        
      } else {
        //console.log(err)
      }
      
    });
  }
