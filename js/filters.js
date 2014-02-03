'use strict';

/* Filters */

angular.module('fortressClicker.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).
  filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});