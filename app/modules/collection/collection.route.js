'use strict';

angular
 .module('collection')
 .config(['$stateProvider', stateProvider]);
 
 function stateProvider($stateProvider) {

  $stateProvider
    .state('home.collection', {
      url : '/{database}/collection',
      parent: 'home',
      views : {
        '@' : {
          controller : 'CollectionCtrl',
          templateUrl : 'app/modules/collection/templates/collection.view.html',
          resolve : {

            collections : function(CollectionService, $stateParams){
              return CollectionService.list($stateParams.database);
            },

            initSocket : function(socket) {
              socket.initialize();
            }
          }
        }
      }  
    });
        
}