'use strict';

angular.module('gameHunterApp', [
  'gameHunterApp.auth',
  'gameHunterApp.admin',
  'gameHunterApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'validation.match',
  'ngResource',
  'ngTable'
])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
