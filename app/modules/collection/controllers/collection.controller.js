'use strict';

angular
 .module('collection')
 .controller('CollectionCtrl', ['$scope', '$mdDialog','collections', 'socket', CollectionCtrl]);

function CollectionCtrl($scope, $mdDialog, collections, socket) {
  socket.reqDbInfo();
  $scope.collections = collections;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  $scope.$on('collection-info',function(event,data){
    var index = _.findIndex(collections,{'collection_name' : data.name});
    $scope.collections[index].stats = data;
  });
}