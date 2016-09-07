var mongoose = require('mongoose');
var expect = require('chai').expect;

describe('feedback-test database', function() {
	before(function() {
		console.log('before');
		mongoose.connect('mongodb://localhost/feedback-test', function() {
			console.log('Connected to feedback-test database!');
		});
	});
});