'use strict';

angular
 .module('collection')
 .controller('CollectionCtrl', ['$scope', '$mdDialog','collections', 'socket', 'CollectionService', '$stateParams', CollectionCtrl]);

function CollectionCtrl($scope, $mdDialog, collections, socket, CollectionService, $stateParams) {
  socket.reqDbInfo();
  $scope.collections = collections;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

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
  }
}