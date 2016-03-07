'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$mdDialog','databases', 'socket','$state', DashboardCtrl])
 .controller('CreateDatabaseCtrl', ['$scope', '$mdDialog', 'toaster', 'DbService', CreateDatabaseCtrl])
 .controller('DeleteDatabaseCtrl', ['$scope', '$mdDialog', 'toaster', 'DbService','$rootScope', DeleteDatabaseCtrl]);

function DashboardCtrl($scope, $mdDialog, databases, socket, $state) {

  socket.reqDbInfo();
  $scope.databases = databases;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  $scope.$on('db-info',function(event,data){
    
    var index = _.findIndex($scope.databases,{'database' : data.database});
    data.size = (data.size).toFixed(2) + ' mb';

    $scope.databases[index].stats = {
      count : {
        val : (data.collections),
        icon : 'assignment'
      },
      size : {
        val : data.size,
        icon : 'view_column'
      },
      verified : {
        icon : (data.verified) ? 'check_circle' : 'warning'
      }
    };

    $scope.$apply();

  });

  $scope.viewCollections = function(index) {
    var database = $scope.databases[index].database;
    $state.go('home.collection',{'database' : database});
  };

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

  $scope.$on('db-delete',function(event,data){
    var index = _.findIndex(databases,{'database' : data.database});
    $scope.databases.splice(index,1);
    $scope.$apply();
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
      $mdDialog.hide($scope.dbName);
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

function DeleteDatabaseCtrl($scope, $mdDialog, toaster, DbService,database,$rootScope) {
  
  $scope.db = {
    'name' : database
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.delete = function() {
    
    var msg = 'Deleting database ' + database,
        key = 'delete-db-' + database;

    $rootScope.$broadcast('notification',{'msg' : msg,'key' : key,'complete': false});
    DbService.delete($scope.db)
      .then(function(result) {
        $mdDialog.hide();
      },function() {
        console.log("error");
      });
    
  };


}