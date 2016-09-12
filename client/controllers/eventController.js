angular
	.module('Feedback.EventController', [])
	.controller('EventController', ['$scope', '$cookies', '$location', 'EventService', EventController]);
	
function EventController($scope, $cookies, $location, EventService) {
	$scope.ssid = $cookies.get('ssid'); // returns back url decoded format
	
	$scope.feedback = [];
	
	// if user is logged in
	if($scope.ssid !== "") {
		
		var eventId = $location.search().id;

		if(eventId) {
			EventService.fetch(eventId)
			.then(function(results) {
				//console.log('results', results);
				$scope.feedback = results.data;
			});
		}
	}

	$scope.postFeedback = function() {
		// set the event_ref by pulling out the url query 'id'
		var eventId = $location.search().id;		
		$scope.feedbackForm.event_ref = eventId;

		var that = this;

		EventService.post($scope.feedbackForm)
			.then(function(result) {
				//console.log('finished feedback post', result.data);

				// clear form
				$scope.feedbackForm = {};
				$scope.fbForm.$setPristine(true);
			});


	}	

}