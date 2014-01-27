'use strict';

/* Controllers */

angular.module('fortressClicker.controllers', []).
  controller('OverviewController', ['$scope', 'game', function($scope, game) {
    $scope.game = game;
  }])
  .controller('DwarvesController', ['$scope', 'game', function($scope, game) {
    $scope.game = game;
  }]);