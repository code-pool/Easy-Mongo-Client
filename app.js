'use strict';

// Declare app level module which depends on views, and components
angular
 .module('myApp', [
  
  'ngMaterial',
  'ui.router',
  'LocalStorageModule',
  'angular-loading-bar',
 
  'directives',
  'services',
  'providers',
  
  'login',
  'dashboard'
 
 ])
 .config(['$locationProvider', '$urlRouterProvider','$httpProvider', urlRouterProvider]); 

function urlRouterProvider($locationProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.interceptors.push('requestInterceptor');
  $urlRouterProvider.otherwise('/login');
};