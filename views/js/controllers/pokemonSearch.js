'use strict';
angular.module('app').controller('pokemonSearchController',
['$scope', '$state', 'resource', '$filter', function($scope, $state, resource, $filter) {
	$scope.searchPokemon = '';
	$scope.pokemons = [];

	$scope.getMatches = function(searchPokemon) {
		return $filter('filter')($scope.pokemons, searchPokemon);
	}

	resource.pokemon.getAll({},
		function success(pokemons) {
			$scope.pokemons = pokemons;
		},
		function err (err) {
			console.log(err);
		}
	);

	$scope.$watch(function() { return $scope.selectedPokemon;},
		function(pokemon) {
			if (pokemon) {
				$scope.$emit('pokemonSearch', pokemon); // going up!
			}
	});
}]);