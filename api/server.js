var express = require('express');
//var models = require('./models');
var app = express();
var bodyParser = require('body-parser')

//var models 	= require('./models') //sequelize
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();
var authentication = require('./middleware/auth')


//mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data/db/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to db at /data/db/")
});
var Job = require('./models/Job');
var User = require('./models/User');

app.use(express.static(__dirname + './../app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//var authentication = require("./middleware/auth");

//models.sequelize.sync().then(function(){

	app.listen(8080,function(){

		console.log('Listening on http://localhost:%s',8080);
		console.log('Stop Server With CTRL + C');
	});
//});




app.get('/scrape', function (req,res) {
	var scrapeFreshBooks = require('./scrape/FreshBooks')
	FreshBooksData = scrapeFreshBooks();
	var scrapeKonrad = require('./scrape/Konrad')
	KonradData = scrapeKonrad();
	var scrapeTopHat = require('./scrape/TopHat')
	TopHatData = scrapeTopHat();
	var scrapeVarageSale = require('./scrape/VarageSale')
	VarageSaleData = scrapeVarageSale();
	var scrapeQuickTapSurvey = require('./scrape/QuickTapSurvey')
	QuickTapSurveyData = scrapeQuickTapSurvey();
	var scrapeBorrowell = require('./scrape/Borrowell')
	BorrowellData = scrapeBorrowell();
	// var scrapeUnata = require('./scrape/Unata')
	// UnataData = scrapeUnata();
	var scrapeSlack = require('./scrape/Slack')
	SlackData = scrapeSlack();
	var scrapeShopify = require('./scrape/Shopify')
	ShopifyData = scrapeShopify();
	res.send('Scraped!');
})





app.get('/', function(req, res) {
	res.send('Express is running!');
});


var JOBDATA2 = {
	Title: 'Principal UX Designer',
	Company: 'TEST',
	Logo: 'https://www.freshbooks.com/_themes/freshbooks/img/responsive/header/freshbooks-logo-rgb.png',
	Location: 'String',
	ComDes: 'FreshBooks is on the verge of launching a completely new platform, and now we’re looking to add leaders to our team that can push our UX team even further in this new era. We’re working toward an ambitious goal to be the best design team in Canada; capable of delivering unprecedented product experiences. As a Principal UX Designer, you will join our design leadership team with a mandate to lead, nurture and grow a team of UX designers already working with industry-leading tools and processes. This role is an outstanding opportunity to stay hands-on with the design work you’re passionate about, while developing a design vision and leading a talented team to achieve it. ',
	ResSum: 'String',
	ResLi: [
      'Co-lead the vision for our products with our UX leadership team',
      'Push our teams to adopt and evolve practices and processes that help them create the best possible products for our customers',
      'Mentor UX designers and develop their careers inside and outside the building',
      'Connect FreshBooks to the local and global UX community by sharing what we’ve learned through speaking opportunities and events '
      ],
	ReqSum: 'String',
	Reqli: [
      'At least 2 years experience leading product UX teams (you can build a vision and inspire people to follow it)',
      'You have strong mentorship skills and a proven track record of developing careers',
      'You have experience working on software products that put the customer first',
      'You are humble but can challenge others to reach a common goal',
      'You can demonstrate the ability to create an inclusive, empathetic, and ambitious design culture',
      ],
	CompenSum: 'String',
	CompenLi: [],
	Website: 'String',
	PostLink:'String',
	ApplyLink: 'https://boards.greenhouse.io/freshbooks/jobs/252809#main_fields',
	ContactName: 'String',
	ContactEmail: 'String',
	ContactPhone: 'String',
	ContactPosition: 'String',
	Type: 'String', //contract/part-time/full-time
	NotExpired: true
}

//req.body.Title
//Add a new job only if no other job with the same company && title
app.get('/addJob',function(req,res){
	Job.find({Title: JOBDATA2.Title, Company: JOBDATA2.Company}, function(err, user) {
		console.log(user)
		if(err) {
			console.log(err)
			res.send(err);
		} else if (user.length==0) {
			console.log('no user');
			Job(JOBDATA2).save(function(err){
				if(err){
					console.log(err);
					res.status(400)
					   .json({err:err});
				}
				else{
					console.log('job added');
					res.json(req.body);
				}
			})
		} else {
			console.log('record exists');
			res.send('record exists')
		}
	})	
});

app.get('/JobDB',function(req,res){
	Job.find({}, function(err, x) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(x);
	    }
	});
});

app.get('/Job/:Id',function(req,res){
	Job.find({_id: req.params.Id}, function(err, x) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(x[0]);
	    }
	});
});
app.get('/deleteAllJob',function(req,res) {
	Job.remove({}, function(err) { 
	   console.log('collection removed') 
	   res.send('collection removed')
	});
});




// //use auth.js in middleware instead for encryption
// app.get('/addUser',function(req,res){
// 	User(newUser).save(function(err){
// 		if(err){
// 			console.log(err);
// 			res.status(400)
// 			   .json({err:err});
// 		}
// 		else{
// 			console.log('user added');
// 			res.json(req.body);
// 		}
// 	})
// });

app.get('/userDB',function(req,res){
	User.find({}, function(err, x) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(x);
	    }
	});
});


app.get('/deleteAllUser',function(req,res) {
	User.remove({}, function(err) { 
	   console.log('collection removed') 
	   res.send('collection removed')
	});
});


//what is this??
app.put('/saveJob/:Id',function(req,res){
	var user;
	User.findOne({email:req.params.Id}, function(err, x) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(x);
	        user = x;
	        var newJob = {
	        id: Id,
	        researched: false,
	        resumed: false,
	        applied: false,
	        interviewed: false,
	        posting: ''
	        }

	        //Job.findOne({_id:})

	        //add: don't add duplicates
	        user.jobSaved.push(newJob)

			User.update({"_id":req.params.objectId},user,{},function(err,object){
				if(err){
					console.log(err);
					res.status(400)
					   .json({err:err})
				}
				else{
					res.json(object);
				}
			});


	    }
	});

	

});

app.post('/addUser', function(req,res){
	console.log('Registration Endpoint');
	var __user = req.body;
	console.log(__user)
	bcrypt.genSalt(10, function(err, salt) {
		console.log('bf bcrypt')
	    bcrypt.hash(__user.password, salt, function(err, hash) {
	        if(!err){
	        	__user.password = hash;
	        	User(__user).save(function(err){
					if(err){
						console.log(err);
						res.status(400)
						   .json({err:err});
					}
					else{
						console.log(__user)
						//localStorage.loginEmail = __user.email

						console.log('user added');
						// res.json('user added');
						
						//set authToken in User
						var token = jwt.sign(__user, salt);
						res.set('authentication', token);
					 
						res.json({msg:'Account Created, please log in!'});
					}
		        	// models.User.create(__user) - postgres doesn't have use
		        	// .then(function(user){
		        	// user.password ='';
		        	// res.json({user:user,msg:'Account Created'});
		        })
	        } else {
	        	console.log(err)
	        }
	    });
	});
});


app.post('/authenticate', function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;
	User.find({email:__user.email}, function(err, user) {

		if (err) {
			console.log(err)
			res.status(403)
		    .json({err:'unauhthorized'});
		} else if (!user[0] || !user[0].password) {
			console.log(err)
			res.status(403)
		    .json({err:'unauhthorized'});
		} else {
			bcrypt.compare(__user.password, user[0].password, function(err, result) {
			    // res == true 
			    if(result==true){
			    	user.password = '';
			    	delete user.password;
			    	var user_obj = {email:user[0].email};
					var token = jwt.sign(user_obj,'brainstationkey');

					res.set('authentication',token);
			    	res.json(user_obj)
			    }
			    else{
			    	console.log('password does not match')
			    	res.status(403)
			    		.json({err:'unauhthorized'});
			    }
			});
		}
	})
})


//eg. http://localhost:8081/getUser/asdf@asdf.com
app.use('/getUser/:Id', authentication, function(req,res) {
	//req.decoded.email is from auth middleware, id is the email in the url. If they match, then the user have access
	if (req.params.Id == req.decoded.email) {
		User.findOne({email:req.params.Id}, function(err, x) {
		    if (err) {
		        console.log(err);
		        res.status(400)
		           .json({err:err});
		    } else {
		        res.json(x);
		    }
		});
	} else {
		res.send('wrong user')
	}
})


app.get('/saveLink/:Email/:JobId',function(req,res) {
	User.find({email:req.params.Email}, function(err, x) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        Job.find({_id:req.params.JobId}, function(err,z) {
	        	if (!err) {
	        		var newJob = {
				        id: req.params.JobId,
				        researched: false,
				        resumed: false,
				        applied: false,
				        interviewed: false,
				        posting: '',
				        notes: ''
				        }
				    newJob.posting = z[0];
	        		x[0].jobSaved.push(newJob);
			        
			        User.update({email:req.params.Email},x[0],{},function(err,y){
				        if(err){
				            console.log(err);
				        }
				        else{
				            console.log(y);
				        }
		    		});
	        	}

	        })
		}
		res.send('Job saved to user')
	});
});

app.get('/deleteJob/:Email/:JobId',function(req,res) {
	User.find({email:req.params.Email}, function(err, x) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	    	x = x[0];
	    	for (var i=0; i<x.jobSaved.length; i++) {
	    		if (req.params.JobId == x.jobSaved[i].id) {
	    			x.jobSaved.splice(i,1)
	    			User.update({email:req.params.Email},x,{},function(err,y){
				        if(err){
				            console.log(err);
				        }
				        else{
				            console.log(y);
				        }
		    		});
	    		}
	    	}
	    	res.json(x)       
		}
	});
});


//doesn't work
app.put('/editJob/:Email/:JobId',function(req,res) {
	console.log('endpoint hit')
	var jobUpdate = {
        id: req.params.JobId,
        researched: req.body.researched,
        resumed: req.body.resumed,
        applied: req.body.applied,
        interviewed: req.body.interviewed,
        posting: req.body.posting, //posting also has an _id
        notes: req.body.notes
	};
	var userUpdate;
	User.findOne({'email':req.params.Email}, function(err,user) {
		if (!err) {
			userUpdate = user;
			for (var i=0; i<user.jobSaved.length; i++) {

				if (user.jobSaved[i].id == req.params.JobId) {
					console.log('inside updating user', user.jobSaved[i].id)
					userUpdate.jobSaved[i] = jobUpdate;

					User.update({'email':req.params.Email},userUpdate,{},function(err,object){
						if (!err) {
							res.json(object)
						} else {
							console.log('cannot update user',err);
							res.status(400).json({err:err})
						}
					})
				}
			}
			//res.json(object);
		} else {
			console.log('cannot find user',err);
			res.status(400).json({err:err})
		}
	})
});



























