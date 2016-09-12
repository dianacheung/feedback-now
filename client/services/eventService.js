angular
	.module('Feedback.EventService', [])
	.service('EventService', ['$http', EventService]);
	
function EventService($http) {
	var eventServiceObj = {};
	
	eventServiceObj.fetch = function(eventId) {
		return $http.get('/feedback/' + eventId);
	};
	
	eventServiceObj.post = function(feedbackObj) {
		return $http.post('/feedback', feedbackObj);
	};

	return eventServiceObj;
}