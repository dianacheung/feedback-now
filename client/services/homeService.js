angular
	.module('Feedback.HomeService', [])
	.service('HomeService', ['$http', HomeService]);
	
function HomeService($http) {
	var homeServiceObj = {};
	
	homeServiceObj.fetch = function() {
		return $http.get('/events');
	};
	
	return homeServiceObj;
}