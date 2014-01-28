'use strict';

/* Controllers */

angular.module('fortressClicker.controllers', [])
    .controller('GameController', ['$scope', 'game', function($scope, game) {
        $scope.game = game;
    }]);