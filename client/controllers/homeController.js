angular
	.module('Feedback.HomeController', [])
	.controller('HomeController', ['$scope', '$cookies', 'HomeService', HomeController]);
	
function HomeController($scope, $cookies, HomeService) {
	$scope.ssid = $cookies.get('ssid'); // returns back url decoded format
	
	$scope.events = [];
	
	// if user is logged in
	if($scope.ssid !== "") {
		HomeService.fetch()
			.then(function(results) {
				//console.log('results', results);
				$scope.events = results.data;
			});
	}

}
