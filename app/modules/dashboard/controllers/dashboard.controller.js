'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$mdDialog','databases', 'socket', DashboardCtrl])
 .controller('SaveDatabaseCtrl', ['$scope', '$mdDialog', 'toaster', SaveDatabaseCtrl])
 .controller('DeleteDatabaseCtrl', ['$scope', '$mdDialog', 'toaster', 'DbService', DeleteDatabaseCtrl]);

function DashboardCtrl($scope, $mdDialog, databases, socket) {

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
  
  $scope.showDailogForDb = function() {
    
    $mdDialog.show({
      controller: SaveDatabaseCtrl,
      templateUrl: 'app/modules/dashboard/templates/createdb.view.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    });

  };

  $scope.deleteDb = function(dbName) {

    $mdDialog.show({
      controller: DeleteDatabaseCtrl,
      templateUrl: 'app/modules/dashboard/templates/deletedb.view.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    }).then(function(){
      var index = _.findIndex(databases,{'db_name' : dbName});
      $scope.databases.splice(index,1);
    },function(err){
      console.log(err);
    })
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

function DeleteDatabaseCtrl($scope, $mdDialog, toaster, DbService) {
  
  $scope.db = {};

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.delete = function() {
    
    DbService.delete($scope.db)
      .then(function(result) {
        $mdDialog.hide();
        $scope.successPopup();
      },function() {
        console.log("error");
        $scope.failPopup()
      });
    
  }

  $scope.successPopup = function(){
    toaster.pop({
      type: 'success',
      body: 'Database has been deleted',
    });
  };

  $scope.failPopup = function() {
    toaster.pop({
      type: 'error',
      body: 'Problem while deleting database',
    });
  }

}