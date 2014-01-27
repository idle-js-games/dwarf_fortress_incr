'use strict';


// Declare app level module which depends on filters, and services
angular.module('fortressClicker', [
  'ngRoute',
  'ngGrid',
  'fortressClicker.filters',
  'fortressClicker.services',
  'fortressClicker.directives',
  'fortressClicker.controllers',
  'ui.sortable',
  'ui.bootstrap',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/overview', {templateUrl: 'partials/overview.html', controller: 'OverviewController'});
  $routeProvider.when('/dwarves', {templateUrl: 'partials/dwarves.html', controller: 'DwarvesController'});
  $routeProvider.otherwise({redirectTo: '/overview'});
}]);
