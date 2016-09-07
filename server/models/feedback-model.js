var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
	sentiment: {type: String, required: true},
	commentary: {type: String},
	event_ref: {type: Schema.Types.ObjectId, ref: 'Event'} 
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;