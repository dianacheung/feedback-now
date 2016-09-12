var app = angular
	.module('myApp', ['ngRoute', 'ngCookies', 'Feedback.HomeService', 'Feedback.HomeController', 'Feedback.EventService', 'Feedback.EventController']);
	
app.config(configFunction);

function configFunction($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './partials/home.html',
			controller: 'HomeController'
		})
		.when('/event', {
			templateUrl: './partials/event.html',
			controller: 'EventController'
		});
}