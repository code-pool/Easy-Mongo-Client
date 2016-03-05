'use strict';

angular
.module('dashboard')
.controller('DashboardCtrl', ['$scope', '$state','databases','socket', DashboardCtrl]);



function DashboardCtrl($scope, $mdDialog, databases,socket) {

  socket.reqDbInfo();
  $scope.databases = databases;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  $scope.$on('db-info',function(event,data){
    var index = _.findIndex(databases,{'db_name' : data.name});
    data.size = parseInt(data.size) + ' mb';
    $scope.databases[index].stats = data;
  });
  
  $scope.showDailogForDb = function(ev) {
    
    $mdDialog.show({
      controller: SaveDatabaseCtrl,
      templateUrl: 'app/modules/dashboard/templates/createdb.view.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    });

  }
}

function SaveDatabaseCtrl($scope, $mdDialog) {

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.save = function() {
    console.log($scope.dbname);
    $mdDialog.hide();
  }

}