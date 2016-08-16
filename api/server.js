var express = require('express');
//var models = require('./models');
var app = express();
var scrape = require('./scrape')
var bodyParser = require('body-parser')

//var models 	= require('./models') //sequelize
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();


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
	app.listen(8081,function(){
		console.log('Listening on http://localhost:%s',8080);
		console.log('Stop Server With CTRL + C');
	});
//});

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


app.get('/deleteAllJob',function(req,res) {
	Job.remove({}, function(err) { 
	   console.log('collection removed') 
	   res.send('collection removed')
	});
});


FreshBooksData = scrape();

var newUser = {
	email: 'hello@hi.com',
	password: 'asdf'
}

//use auth.js in middleware instead for encryption
app.get('/addUser',function(req,res){
	User(newUser).save(function(err){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err});
		}
		else{
			console.log('user added');
			res.json(req.body);
		}
	})
});

app.get('/userDB',function(req,res){
	User.find({Email: req.Title}, function(err, x) {
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


app.get('/userByE', function(req,res) {
	User.find({}, function(err, x) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(x);
	    }
	});
})


app.post('/addUser',function(req,res){
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
						console.log('user added');
						res.json('user added');
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

app.post('/authenticate',function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;

	User.find({email:__user.email}, function(err, user) {
		if (err) {
			res.status(403)
		    .json({err:'unauhthorized'});
		} else {
			user.password = '';
		    	delete user.password;
		    	var user_obj = {email:user.email};
				var token = jwt.sign(user_obj,'brainstationkey');

				res.set('authentication',token);
		    	res.json(user_obj)
		}
	})
})










