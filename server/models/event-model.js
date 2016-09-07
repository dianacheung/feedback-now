const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Feedback = require('./feedback-model');

const eventSchema = new Schema({
	summary: String,
	cohort: Number,
	start: {type: Date},
	end: {type: Date},
	user_ref: {type: Schema.Types.ObjectId, ref: 'User'} 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;