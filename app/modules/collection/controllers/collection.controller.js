'use strict';

angular
 .module('collection')
 .controller('CollectionCtrl', ['$scope', '$mdDialog','collections', 'socket', 'CollectionService', '$stateParams', CollectionCtrl])
 .controller('DocumentsCtrl',['$scope',DocumentsCtrl]);

function CollectionCtrl($scope, $mdDialog, collections, socket, CollectionService, $stateParams) {
  socket.reqDbInfo();
  $scope.collections = collections;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  $scope.schema = {
    'type' : 'String'
  }

  $scope.$on('collection-info',function(event,data){
    var index = _.findIndex(collections,{'collection_name' : data.name});
    $scope.collections[index].stats = data;
    $scope.$apply();
  });
  $scope.$on('collection-delete',function(event,data){
    var index = _.findIndex(collections,{'collection_name' : data.collection});
    $scope.collections.splice(index,1);
  });

  $scope.deleteCollection = function(colName) {

    var confirm = $mdDialog.confirm()
        .title('Would you like to delete your Collection?')
        .textContent('All the important data from this collection will be lost')
        .ariaLabel('Are you sure')
        .ok('Yes')
        .cancel('No');
    $mdDialog.show(confirm).then(function() {
      console.log(colName);
      CollectionService.delete($stateParams.database, colName);
    }, function() {
      console.log('cancel');
    });
  };

  $scope.addCollection = function(){
    $mdDialog.show({
      controller: CreateCollectionCtrl,
      resolve : {
        'collections' : function(){
          return collections
        }
      },
      templateUrl: 'app/modules/collection/templates/createcol.view.html',
      parent: angular.element(document.body),
      clickOutsideToClose:false
    }).then(function(col_name){
      collections.push({'collection_name' : col_name,'stats' : {}});
      $scope.collections = collections;
    })
  };
}

function DocumentsCtrl($scope){
  $scope.desserts = { };
}

function CreateCollectionCtrl($scope,$mdDialog,collections,_,CollectionService,$stateParams){

  $scope.types = [
    'String',
    'Number',
    'Array',
    'Object',
    'Date',
    'Boolean'
  ];

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.schema = {
    'collection' : '',
    'fields' : [{
      'key' : '',
      'type' : 'String',
      'required' : true,
      'alias' : ''
    }]
  };

  $scope.addField = function(){
    $scope.schema.fields.push({
      'key' : '',
      'type' : 'String',
      'required' : true,
      'alias' : ''      
    });
  };

  $scope.deleteField = function(index){
    $scope.schema.fields.splice(index,1);
  };

  $scope.createSchema = function(){

    var index = _.findIndex(collections,{'collection_name' : $scope.schema.collection});
    if(index >= 0) {
      return;
    }

    CollectionService.add($stateParams.database,$scope.schema).then(function(){
      $mdDialog.hide($scope.schema.collection);
    },function(err){
      console.log(err);
    });

    
  };


};