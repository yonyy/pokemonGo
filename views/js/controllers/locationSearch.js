'use strict';
angular.module('app').controller('locationSearchController',
['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
	$scope.locationInput = $stateParams.initialAddress;
	$scope.locationResult = null;
	$scope.formatted_address = '';

	$scope.$watch(function() { return $scope.locationResult;},
		function(location) {
			if (location) {
				$scope.formatted_address = $scope.locationResult.formatted_address;
				$scope.$emit('formatted_address', $scope.formatted_address); // going up!
			}
	});
}]);