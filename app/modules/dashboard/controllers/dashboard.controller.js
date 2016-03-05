'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$mdDialog','databases','socket', DashboardCtrl])
 .controller('SaveDatabaseCtrl', ['$scope', '$mdDialog', 'toaster', SaveDatabaseCtrl]);

function DashboardCtrl($scope, $mdDialog, databases,socket) {

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

function SaveDatabaseCtrl($scope, $mdDialog, toaster) {

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.save = function() {
    $mdDialog.hide();
    $scope.successPopup();
  }

  $scope.successPopup = function(){
    toaster.pop({
      type: 'success',
      title: 'Congrats',
      body: 'Database has been created',
    });
  };

}