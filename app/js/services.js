'use strict';

angular.module('fortressClicker.services', [], function($provide) {
  $provide.factory('game', [ '$interval', function($interval) {
    var game = new FortressClicker.Game();
    $interval(function() { game.tick(); }, 100);
    return game;
  }]);
});