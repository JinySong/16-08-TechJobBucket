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


module.exports = function () {
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
              newJob.Title = cheerio.load(body)('h1').text();
              var p = (cheerio.load(body)('.job-description.u-text-wrap p:nth-child(1)').text().length>100) ? 3 : 2; 
              newJob.ResSum = cheerio.load(body)('.job-description.u-text-wrap p:nth-child('+p+')').text();
              newJob.ResLi = (cheerio.load(body)('.job-description.u-text-wrap ul').html()).replace(/<li>/g,'').replace(/(\r\n|\n|\r)/gm,'').replace(/<\/li>/g,'xxx').split('xxx');
              newJob.ReqLi = (cheerio.load(body)('.job-description.u-text-wrap ul:nth-of-type(2)').html()).replace(/<li>/g,'').replace(/(\r\n|\n|\r)/gm,'').replace(/<\/li>/g,'xxx').split('xxx');
              newJob.ApplyLink = cheerio.load(body)('div.u-text-center a.button-primary.u-text-center').attr("href").split('</li>')[0];

              newJob.ComDes = 'FreshBooks has a big vision. We launched in 2003 but we’re just getting started and there’s a lot left to do. We\'re a high performing team working towards a common goal: building a kick-ass online accounting application to help small businesses better manage their finances. Known for extraordinary customer service and based in Toronto, Canada, FreshBooks serves paying customers in over 120 countries. \n We\'re an ambitious bunch, with our eyes laser-focused on shipping extraordinary experiences to small business owners.  You\'ll be surrounded by talented team members who share a common vision for what an amazing software company could be, and have the opportunity to help shape how we build a world-class company right here in downtown Toronto.  '
              newJob.Company = 'freshbooks';
              newJob.Logo = 'http://www.cheqroom.com/wp-content/files/freshbooks-logo.png';
              newJob.Location = 'Toronto, ON';
              newJob.Website = 'https://www.freshbooks.com'

              //console.log(newJob)
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



              //console.log(!!jobs[n])
              //console.log(jobs)
              var done = true;

              for (var i=0; i<n; i++){
                if (!!jobs[i]==!1) {
                  done =false;
                }
              }

              if (done) {
                console.log('done');
                console.log(jobs);
                return jobs;

                
              } else {
                console.log(n);
              }
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
}


//put an endpoint to trigger scrape
//set timeout to scrape every day

//function shouldn't be surrounded by anything unless it's a method of the controller. it should be a code block
