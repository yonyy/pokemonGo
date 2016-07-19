'use strict';
angular.module('app').controller('searchController',
['$scope', '$state', '$stateParams', '$filter', 'resource',
function($scope, $state, $stateParams, $filter, resource) {
	var self = this;
	resource.researcher.search({},
		function success(res) {
			self.res = res;
		},
		function err(err) {
			self.res = err;
		}
	);
}]);