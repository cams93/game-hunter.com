'use strict';

angular.module('gameHunterApp.auth', [
  'gameHunterApp.constants',
  'gameHunterApp.util',
  'ngCookies',
  'ngRoute'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
