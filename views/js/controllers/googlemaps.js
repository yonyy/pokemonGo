'use strict';
angular.module('app').controller('googleMapsController',
['$scope', '$state', '$geolocation', 'uiGmapGoogleMapApi', 'uiGmapIsReady', 'resource',
function($scope, $state, $geolocation, uiGmapGoogleMapApi, uiGmapIsReady, resource) {
	var self = this;
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 16 };
	$scope.userMarker = {};
	$scope.markers = [];
	$scope.isLocationSearch = true;
	$scope.isPokemonSearch = false;
	$scope.location = {};
	$scope.pokemon = {};

	uiGmapGoogleMapApi.then(function(maps) {
		$geolocation.getCurrentPosition({timeout: 60000})
			.then(function(position) {
				$scope.map.center.latitude = position.coords.latitude;
				$scope.map.center.longitude = position.coords.longitude;
				$scope.userMarker.key = 1;
				$scope.userMarker.coords = $scope.map.center;
				$scope.markers.push($scope.userMarker);

				var latlng = [$scope.map.center.latitude.toString(), $scope.map.center.longitude.toString()].join(',');
				resource.google.reverseGeocode({latlng: latlng},
					function success(res) {
						$scope.location.model = res.results[0].formatted_address;
						$state.go('main.locationSearch', {initialAddress: $scope.location.model});
					},
					function error(err) {
						console.log(err);
					});

			});

		if(!(typeof(componentHandler) == 'undefined')) {
			componentHandler.upgradeAllRegistered();
		}
	});

	$geolocation.watchPosition({
		timeout: 60000,
		maximumAge: 250,
		enableHighAccuracy: true
	});

	$scope.$on(function() {return $geolocation.position.changed}, 
		function(event, newPosition){
		    $scope.map.center.latitude = newValue.latitude;
			$scope.map.center.longitude = newValue.longitude;
		}
	);

	$scope.$on('formatted_address', function (event, formatted_address) {
		$scope.location.formatted_address = formatted_address;
		$scope.location.geocode();
	});

	$scope.$on('pokemonSearch', function (event, pokemonSearch) {
		console.log(pokemonSearch); // 'Some data'
	});

	$scope.location.geocode = function() {
		resource.google.geocode({address: $scope.location.formatted_address},
		function success (res) {
			$scope.map.center.latitude = res.results[0].geometry.location.lat;
			$scope.map.center.longitude = res.results[0].geometry.location.lng;
			$scope.userMarker.coords = $scope.map.center;

		},
		function error (err) {
			console.log(err);
		});
	};

	$scope.switchToLocation = function() {
		$scope.isLocationSearch = true;
		if ($scope.isPokemonSearch) {
			$scope.isPokemonSearch = false;
			$state.go('main.locationSearch',{initialAddress: $scope.location.model});
		};
	};

	$scope.switchToPokemon = function() {
		$scope.isPokemonSearch = true;
		if ($scope.isLocationSearch) {
			$scope.isLocationSearch = false;
			$state.go('main.pokemonSearch');
		}
	}

	$('body').materialScrollTop({
		revealElement: 'md-card',
		revealPosition: 'bottom',
	});
	
}]);