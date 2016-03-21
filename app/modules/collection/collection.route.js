'use strict';

angular
 .module('collection')
 .config(['$stateProvider', stateProvider]);
 
 function stateProvider($stateProvider) {

  $stateProvider
    .state('easymongo.collection', {
      url : '/{database}/collection',
      parent: 'easymongo',
      views : {
        'content' : {
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
    })
    .state('easymongo.collection.documents', {
      url : '/{database}/{collection}/documents',
      parent: 'easymongo',
      views : {
        'content' : {
          controller : 'DocumentsCtrl',
          templateUrl : 'app/modules/collection/templates/collection.documents.html',
          resolve : { 
            documents : function(DocumentService,$stateParams){
              return DocumentService.list($stateParams.database,$stateParams.collection);
            }
          }
        }
      }  
    });
        
}