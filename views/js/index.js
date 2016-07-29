'use strict';
var app = angular.module('app', ['ngResource', 'ui.router','ngGeolocation','uiGmapgoogle-maps', 'ngAutocomplete', 'ngAnimate', 'ngMaterial']);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider','uiGmapGoogleMapApiProvider',
	function($stateProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider){
		$urlRouterProvider.otherwise('/dashboard');
		$stateProvider
			.state('main', {
				url: '/dashboard',
				views: {
					'body' : {
						templateUrl: 'partials/googlemaps.html',
						controller: 'googleMapsController as gmc',
						abstract: true
					}
				}
			})
			.state('main.pokemonSearch', {
				url: '/pokemon',
				views: {
					'search' : {
						templateUrl: 'partials/pokemonSearch.html',
						controller: 'pokemonSearchController as psc'
					}
				}
			})
			.state('main.locationSearch', {
				url: '/location',
				views: {
					'search' : {
						templateUrl: 'partials/locationSearch.html',
						controller: 'locationSearchController as lsc'
					}
				},
				params: {
					initialAddress : null
				}
			});

		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyB54ZZv-VPUbWTDR1o1vb_alHaX5REYnUo',
			v: '3.20',
			libraries: 'weather,geometry,visualization,places'
		});
	}
]);

app.factory('resource', ['$resource', function($resource) {
	var self = this;
	self.key = 'AIzaSyB54ZZv-VPUbWTDR1o1vb_alHaX5REYnUo';
	self.google = $resource('https://maps.googleapis.com/maps/api/geocode/json', null,
		{
			'geocode' : {method : 'GET', isArray: false, params: {address: '@address', key: self.key}},
			'reverseGeocode' : {method: 'GET', isArray: false, params: {latlng: '@latlng', key: self.key}} 
		}
	);

	self.pokemon = $resource('/api/pokemon', null,
		{
			'getAll' : {method: 'GET', isArray: true, params: {}}
		}
	);

	return self;
}])