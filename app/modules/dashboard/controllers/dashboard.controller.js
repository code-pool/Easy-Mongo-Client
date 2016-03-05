'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$mdDialog','databases', 'socket', DashboardCtrl])
 .controller('CreateDatabaseCtrl', ['$scope', '$mdDialog', 'toaster', 'DbService', CreateDatabaseCtrl])
 .controller('DeleteDatabaseCtrl', ['$scope', '$mdDialog', 'toaster', 'DbService', DeleteDatabaseCtrl]);

function DashboardCtrl($scope, $mdDialog, databases, socket) {

  socket.reqDbInfo();
  $scope.databases = databases;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  $scope.$on('db-info',function(event,data){
    var index = _.findIndex(databases,{'db_name' : data.name});
    data.size = (data.size).toFixed(2) + ' mb';
    $scope.databases[index].stats = data;
  });

  $scope.$on('db-create',function(event,data){
    $scope.databases.push(data);
  });

  $scope.showDailogForDb = function(ev) {

    $mdDialog.show({
      controller: CreateDatabaseCtrl,
      templateUrl: 'app/modules/dashboard/templates/createdb.view.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true
    });

  };

  $scope.$on('db-delete',function(event,db_name){
    var index = _.findIndex(databases,{'db_name' : db_name});
    $scope.databases.splice(index,1);
  });
  
  $scope.deleteDb = function(dbName) {

    $mdDialog.show({
      controller: DeleteDatabaseCtrl,
      templateUrl: 'app/modules/dashboard/templates/deletedb.view.html',
      parent: angular.element(document.body),
      resolve : {
        database : function(){
          return dbName;
        }
      },
      clickOutsideToClose:true
    }).then(function(){
    },function(err){
      console.log(err);
    })
  }
}

function CreateDatabaseCtrl($scope, $mdDialog, toaster, DbService) {

  $scope.cancel = function() {
    $mdDialog.cancel();
  };


  $scope.create = function() {
    DbService.create($scope.dbname).then(function(){
      $mdDialog.hide();
      $scope.successPopup();      
    });
  }

  $scope.successPopup = function(){
    toaster.pop({
      type: 'success',
      title: 'Congrats',
      body: 'Database has been created',
    });
  };

}

function DeleteDatabaseCtrl($scope, $mdDialog, toaster, DbService,database) {
  
  $scope.db = {
    'name' : database
  };

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