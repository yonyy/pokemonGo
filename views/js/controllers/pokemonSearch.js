'use strict';
angular.module('app').controller('pokemonSearchController',
['$scope', '$state', function($scope, $state) {
	$scope.pokemonSearch = '';
	console.log('pokemonSearch');
	$scope.goUp = function() {
		$scope.$emit('pokemonSearch', $scope.pokemonSearch); // going up!
	}
}]);