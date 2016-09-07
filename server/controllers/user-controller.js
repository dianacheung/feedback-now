var User = require('../models/user-model');

var userController = {};

userController.createUser = function(req, res, next) {
	var newUser = req.body;
	
	User.create(newUser, function(err, result) {
		if(! err) {
			// passover the result._id
			req.ssid = result._id;
			next();
		}
	});
		
};

userController.verifyUser = function(req, res, next) {
	
	//console.log('req.body', req.body);
	
	var query = {};
	query.username = req.body.username;
	
	User.findOne(query, function(err, result) {
		if(result) {
			//console.log('result', result._id);
			req.ssid = result._id;
			next();
		}
	});
	
};

module.exports = userController;