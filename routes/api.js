'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Project = require('../models/project');
var passport = require('passport');
const jwt = require('jsonwebtoken');
var config = require('../config/database');
var Agent = require('../models/agent');
var addTicket = require('../models/addticket');
var message = require('../models/msg');
var multer = require('multer');
var mongoose = require('mongoose');
var morgan = require('morgan');
var secret = 'dbsrcret';
var chat = require('../models/agent_chats');
var room = require('../models/room');
var startChat = require('../models/chat');
var assign = require('../models/assign_project');
var port = process.env.port || 3000;
var app = require('../app');
var http = require('http')
var db = mongoose.connect('mongodb://localhost:27017/meanauth');
const cors = require('cors');


//File Uploading
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)

	}
})
var upload = multer({ dest: "uploads/" }).array("uploads[]", 12)


router.put('/upload', function (req, res) {
	console.log('node upload main function !');
	upload(req, res, function (err) {
		if (err) throw err;

		console.log('file uploaded');

	});
})


//Register Company
router.post('/register', function (req, res) {

	var newUser = new User();
	newUser.username = req.body.username;
	newUser.email = req.body.email;
	newUser.password = req.body.password;
	if (req.body.username == null || req.body.username == '' || req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '') {
		res.json({ success: false, message: 'ensure username,password, and email are provided' });
	}
	else {
		User.getUserByUsername(newUser.username, function (err, data) {
			if (err) throw err;

			if (data) {
				res.json({ success: false, message: 'Comapny already registered' });
				res.end();
			} else {
				User.adduser(newUser, function (err) {
					if (err) {
						res.json({ success: false, message: "Error while registering" });
						console.log(err);
					}
					else {
						res.json({ success: true, message: 'User Registered Successfully' });
						console.log(newUser);
					}
				});
			}
		})

	}

});


//Authenticate Comapny
router.post('/authenticate', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;


	User.findOne({ username: req.body.username }, function (err, user) {
		if (err) throw err;
		if (!user) {
			return res.json({ success: false, msg: 'User not found' });
			res.end();
		}
		else if (user) {
			if (req.body.password) {
				User.comparePassword(password, user.password, function (err, isMatch) {
					if (err) throw err;

					if (isMatch) {
						var token = jwt.sign({ data: user }, config.secret, { expiresIn: 604800 });
						res.json({
							success: true,
							message: "User authenticated",
							token: 'JWT ' + token,
							user: {
								id: user._id,
								username: user.username,
								email: user.email,
								password: user.password
							}
						});
						req.session.message = "Login Successfull"
					} else {
						req.session.message = "Login failed"
						return res.json({ success: false, msg: 'Wrong password' });
						
					}

				});
			}
		}
	});
});


// Profile
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	res.json({ user: req.user });
});

router.get('/agent-board', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	res.json({ user: req.user });
});





//Adding Projects By Comapny

router.post('/addproject/:comapny_Id', function (req, res) {
	console.log(req.body.data)
	console.log('test')
	var project = new Project();
	project.name = req.body.name;
	project.url = req.body.url;
	project.company_Id = req.params.comapny_Id;

	if (req.body.name == null || req.body.name == '' || req.body.url == null || req.body.url === '') {
		res.json({ success: false, message: 'ensure projects are added' });
	}
	else {
		Project.getProjectByName(project.name, function (err, data) {
			if (err) throw err;

			if (data) {
				res.json({ success: false, message: 'This Project is already added' });
				//res.redirect(['/project/'+project.company_Id]);
				res.end();

			} else {
				Project.addproject(project, function (err) {
					if (err) {
						res.json({ success: false, message: "Error while adding project" });
						console.log(err);
					}
					else {
						res.json({ success: true, message: 'Project Added Successfully' });
						console.log(project);
					}
				});
			}

		})

	}
});

// Listing of Projects Added By Company
router.get('/project/:company_Id', function (req, res) {

	Project.find({ company_Id: req.params.company_Id }, function (err, project) {
		if (err) return next(err);
		res.json(project);
	});
});

// Listing of All Agents Added By Company against projectss
router.get('/agent/:company_Id', function (req, res) {

	Agent.find({ company_Id: req.params.company_Id }, { "name": "$name" }, function (err, agent) {
		if (err) return next(err);
		res.json(agent);
	});
});


router.get('/project', function (req, res) {

	Project.find({}, { "name": "$name", "project_name": "$project_name" }, function (err, agent) {
		if (err) return next(err);
		res.json(agent);
	});
});



router.get('/find_customers', function (req, res) {
	startChat.find({}, function (err, data) {
		if (err) return next(err);
		res.json(data);
	});
});




//Get CompanyData to display on company dashoard
router.get('/companyData/:id', function (req, res) {
	User.find({ _id: req.params.id }, { "_id": "$_id", "username": "$username" }, function (err, data) {
		if (err) throw err;
		res.json(data);
	})
})







//Register Agent
router.post('/addagent/:company_Id', function (req, res) {
	console.log('test')
	var newUser = new Agent();
	newUser.name = req.body.name;
	newUser.password = req.body.password;
	newUser.company_Id = req.params.company_Id;

	if (req.body.name == null || req.body.name == '' || req.body.password == null || req.body.password == '') {
		res.json({ success: false, message: 'ensure fields are filled' });
	}
	else {
		Agent.getUserByUsername(newUser.name, function (err, user) {
			if (err) throw err;
			if (user) {
				res.json({ success: false, message: "Agent already exists" });
				res.redirect('/agent/' + newUser.company_Id);
				// res.end();
			} else {

				Agent.adduser(newUser, function (err) {
					if (err) {
						res.json({ success: false, message: "Error while registering Agent" });
						console.log(err);
					}
					else {
						res.json({ success: true, message: 'Agent Registered Successfully' });
						console.log(newUser);
					}
				});

			}
		})


	}
});

//Authentication when agent logs in
router.post('/agentlogin', function (req, res) {
	var name = req.body.name;
	var password = req.body.password;

	Agent.findOne({ name: req.body.name }, function (err, user) {
		if (err) throw err;
		if (!user) {
			return res.json({ success: false, msg: 'User not found' });


		}
		else if (user) {
			if (req.body.password) {
				Agent.comparePassword(password, user.password, function (err, isMatch) {
					if (err) throw err;


					if (isMatch) {

						var token = jwt.sign({ data: user }, config.secret, { expiresIn: 604800 });
						res.json({
							success: true,
							message: "User authenticated",
							token: 'JWT ' + token,
							user: {
								name: user.name,
								id: user.id,
								company_Id:user.company_Id
							}
						});
						console.log(user);
						console.log(token)
					} else {
						return res.json({ success: false, msg: 'Wrong password' });
					}

				});
			}
		}
	});
});


//save data when member open chat page from prog-page component
router.post('/chat/:project_id/:project_name', function (req, res) {
	var Chat = new startChat();
	var msg = [];
	msg.push({message : req.body.message,sender : 'user'});
	Chat.project_Id = req.params.project_id;
	Chat.project_name = req.params.project_name;
	Chat.user_name = req.body.name;
	Chat.customer_email = req.body.email;
	Chat.message = msg ;
	Chat.status = "open";
	req.session.customer_email = req.body.email
	res.cookie('custome-email',req.body.name);

	var email  = req.body.email
	
	startChat.getUserByEmail(email,function(err,data){
		if(err) throw err;
		if(data){
			res.status(400).json({message: 'A user with that email does not exist.'});
			req.session.message = 'User with that Email Already Exist';
			req.session.messageType = 'danger';
			// res.json({ success: false, message: 'User with that Email Already Exist' });
			res.end();
		}
		else{
			
			Chat.save(function (err, data) {
				if (err) throw err;
				res.json(data);
		
			})
			
		}
	})
	
	

	
})


//Get Agent based on project name from assignproj collection
router.get('/agentName/:project_name', function (req, res) {
	assign.find({ project_name: req.params.project_name }, { "project_name": "$project_name", "agent_name": "$agent_name" }, function (err, agent) {
		console.log(req.params.project_name);

		if (err) return next(err);
		res.json(agent);
	});
});

//Fetching single project with ID
router.get('/id/:project_id', function (req, res, next) {
	console.log(req.params.project_id);
	Project.findOne(req.params.project_id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});


router.get('/project/:name', function (req, res, next) {
	console.log(req.params.name);
	Project.findOne({ name: req.params.name }, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});





//Assigning project to agent 
router.post('/assignProj/:project_Id', function (req, res) {
	console.log('projectID',req.params.project_Id)
	var Assign = new assign();
	Assign.agent_name = req.body.name;
	Assign.project_Id = req.params.project_Id;


	Assign.save(function (err, data) {
		if (err) throw err;
		res.json(data)
	})
})

router.get('/agentData/:name', function (req, res) {

	Agent.find({ name: req.params.name }, {}, function (err, data) {
		if (err) throw err;
		res.json(data)
	})
})



// console.log(agent_name)

// var socket = require('socket.io')(server)

router.get('/find/:name', function (req, res, next) {
	// const channel = 'chat';
	// var Pusher = require('pusher');
	// var pusher = new Pusher({
	//   appId: '598550',
	//   key: 'a8a44b6b63a732630089',
	//   secret: 'b4c7ac41ad5a2c63bc1b',
	//   cluster: 'ap2',
	//   encrypted: true
	// });

	// pusher.trigger('my-channel', 'my-event', {
	//   "message": "hello world"
	// });

	// const Collection = chat;
	// const changeStream = Collection.watch(
	// 	{ 
	// 		$match:
	// 		{
	// 		    "status": "unassigned"

	// 	    } 
	// 	}
	//    );

	Agent.aggregate(
		[
			{
				$match:
				{
					"name": req.params.name

				}
			},

			{
				$lookup:
				{
					from: "assignprojs",
					localField: "name",
					foreignField: "agent_name",
					as: "all_project"
				}
			},
			{
				$lookup:
				{
					from: "chats",
					localField: "all_project.project_Id",
					foreignField: "project_Id",
					as: "all_chat"
				}

			},
			{ $unwind: "$all_chat" },
			{
				$match: { "all_chat.status": 'open' }
			},

			{
				$project:
				{
					'chat_id': "$all_chat._id",
					'status': "$all_chat.status",
					"chat_projectName": "$all_chat.project_name",
					"project_Id": "$all_chat.project_Id"
				}

			}
		], function (err, data) {
			if (err) throw err;
			res.json(data)

		});


	// changeStream.on('change', (change) => {
	//    console.log(change);

	//    if(change.operationType === 'insert') {
	//      const task = change.fullDocument;
	//      pusher.trigger(
	//        channel,
	//        'inserted', 
	//        {
	//          id: task._id,
	//          chat: task.task,
	//        }
	//      ); 
	//    } 
	// });

});





router.put('/updateChatStatus/:project_name', function (req, res) {
	startChat.findOneAndUpdate({ project_name: req.params.project_name }, { $set: { "status": "1" } }, function (err, data) {
		if (err) throw err;
		res.json(data)
	})
})

router.put('/closeChat/:project_Id', function (req, res) {
	startChat.updateMany({ project_Id: req.params.project_Id }, { $set: { "status": "close" } }, function (err, data) {
		if (err) throw err;
		res.json(data)
	})
})


router.get('/checkChatStatus/:project_name', function (req, res) {
	startChat.find({ "project_name": req.params.project_name, "status": "1" }, function (err, data) {
		if (err) throw err;
		res.json(data)
	})
})






module.exports = router;




