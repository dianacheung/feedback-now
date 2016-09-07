var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var userCtrl = require('./controllers/user-controller.js');
var eventCtrl = require('./controllers/event-controller.js');
var feedbackCtrl = require('./controllers/feedback-controller.js');
var cookieCtrl = require('./controllers/cookie-controller.js');

// connect to mongodb
mongoose.connect('mongodb://localhost/feedback-dev', function() {
	console.log('Connected to feedback-dev database!');

});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

/**
 Root path - homepage
 */
app.get('/', function(req, res) {
	res.status(200).sendFile(path.resolve('client/index.html'));
});

app.get('/event', function(req, res) {
	res.status(200).sendFile(path.resolve('client/event.html'));
});

/**
 Files
 */
app.get('/index.js', function(req, res) {
	res.status(200).sendFile(path.resolve('client/index.js'));
});

app.get('/event.js', function(req, res) {
	res.status(200).sendFile(path.resolve('client/event.js'));
});

/** 
 User related routes
 */ 
app.post('/signup', userCtrl.createUser, cookieCtrl.setSSIDCookie, function(req, res) {
	res.redirect('/');
	//res.status(200).send('signup done');
});

app.post('/login', userCtrl.verifyUser, cookieCtrl.setSSIDCookie, function(req, res) {
	res.redirect('/');
	//res.status(200).send('login done');
});

app.get('/logout', function(req, res) {
	var ssid = req.cookies.ssid;
	
	// delete cookie
	res.clearCookie('ssid');
	
	res.redirect('/');
});


/**
 Event related routes
 */
// get events for a specific user id
app.get('/events', eventCtrl.getEvents);

// get event details for a specific event id
app.get('/events/:id', eventCtrl.getEvent);

// create an event for a specific user id
app.post('/event', eventCtrl.postEvent, function(req, res) {
	res.redirect('/');
});


/** 
 Feedback related routes
 */
// get all feedback for a specific event id
app.get('/feedback/:id', feedbackCtrl.getFeedback);

// create a feedback for a specific event id
app.post('/feedback', feedbackCtrl.postFeedback, function(req, res) {
	// redirect back to /event?=eventId page
	res.redirect('/event?id=' + req.body.event_ref);
});


app.listen(8000, () => {
	console.log('Server listening on port 8000!');
});

module.exports = app;