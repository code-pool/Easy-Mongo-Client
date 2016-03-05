'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$mdDialog','databases','socket', DashboardCtrl])
 .controller('SaveDatabaseCtrl', ['$scope', '$mdDialog',SaveDatabaseCtrl]);

function DashboardCtrl($scope, $mdDialog, databases,socket) {

  console.log(databases);
  socket.reqDbInfo();

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