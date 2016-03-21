'use strict';

angular
 .module('easymongo')
 .config(['$stateProvider', stateProvider]);
 
 function stateProvider($stateProvider) {

  $stateProvider
    .state('easymongo',{
      url : '/easymongo',
      views : {
        '@' : {
          controller : 'BaseCtrl',
          templateUrl : 'app/modules/base/templates/base.view.html'
        }
      }  
    });
        
}