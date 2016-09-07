var Event = require('../models/event-model');

var eventController = {};

/**
 Find event by a specific event id
 */
eventController.getEvent = function(req, res) {
	//console.log('req.params.id', req.params.id);
	
	var query = {};
	query._id = req.params.id;
	
	Event.findOne(query, function(err, result) {
		if(err) {
			console.log('find error:', err);
			return res.status(500).send(err);
		} else {

			var output = {};
			output.summary = result.summary;
			output.cohort = result.cohort;
			output.start = result.start;
			output.end = result.end;
			output._id = result._id;
			
			return res.status(200).send(output);
		}
	});
	
}

/**
 Find events by a specific user id
 */
eventController.getEvents = function(req, res) {
	//console.log('req.body', req.body);
	//console.log('req.cookies', req.cookies);
	
	var query = {};
	query.user_ref = req.cookies.ssid;
	
	Event.find(query, function(err, results) {
		if(err) {
			console.log('find error:', err);
			return res.status(500).send(err);
		} else {
			//console.log('find results:', results);
			return res.status(200).send(results);
		}
	});
	
}

/**
 Add an event to the database for a specific user id
 */
eventController.postEvent = function(req, res, next) {
	//console.log('req.body', req.body);
	//console.log('req.cookies', req.cookies);
	
	var evt = {summary: req.body.summary, cohort: req.body.cohort, start: new Date(req.body.start), end: new Date(req.body.end), user_ref: req.cookies.ssid};
	
	/*Event.create(evt, function(err, result) {
		if(err) {
			return res.status(500).send(err);
		} else {			
			return res.status(200).json(result);
		}
	});*/
	
	Event.create(evt, function(err, result) {
		if(err) {
			console.log('postEvent err:', err);
		} else {			
			next();
		}
	});
	
}

module.exports = eventController;