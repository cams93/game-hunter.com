'use strict';

angular.module('gameHunterApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:comments', {
        template: '<comments></comments>'
      });
  });
