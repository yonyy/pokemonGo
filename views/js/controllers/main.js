'use strict';
angular.module('app').controller('mainController',
['$scope', '$state', '$stateParams', '$filter', 'resource',
function($scope, $state, $stateParams, $filter, resource) {
	var self = this;
	$state.go('dash');
}]);