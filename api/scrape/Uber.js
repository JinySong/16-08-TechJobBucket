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
request('https://www.freshbooks.com/careers', function(err,res,body) {
  if(!err) {
    var count = 0;
       
  } else {
    console.log(err);
  };
});
}
