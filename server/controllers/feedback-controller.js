var Feedback = require('../models/feedback-model');

var feedbackController = {};

feedbackController.getFeedback = function(req, res) {
	//console.log('req.params', req.params);
	var query = {};
	query.event_ref = req.params.id;
	
	Feedback.find(query, function(err, results) {
		if(err) {
			console.log('find error:', err);
			return res.status(500).send(err);
		} else {
			//console.log('find results:', results);
			return res.status(200).send(results);
		}
	});
};

feedbackController.postFeedback = function(req, res) {
	//console.log('req.body', req.body);
	//console.log('req.cookies', req.cookies);
	
	/*
	Feedback.create(req.body, function(err, result) {
		if(err) {
			return res.status(500).send(err);
		} else {			
			return res.status(200).json(result);
		}
	});
	*/
	/*
	Feedback.create(req.body, function(err, result) {
		if(err) {
			console.log('postFeedback err:', err);
		} else {
			console.log('saved feedback', result);
			next();
		}
	});
  */

	Feedback.create(req.body, function(err, result) {
		if(err) {
			console.log('postFeedback err:', err);
		} else {
			console.log('saved feedback', result);
			res.status(200).send(result);
		}
	});


};

module.exports = feedbackController;