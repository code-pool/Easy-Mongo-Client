'use strict';

angular
 .module('database')
 .controller('DatabaseCtrl', ['$scope', '$mdDialog','databases', 'socket','$state','navigationService','config','DbService', DatabaseCtrl])
 .controller('CreateDatabaseCtrl', ['$scope', '$mdDialog', 'DbService','$rootScope', CreateDatabaseCtrl])
 .controller('DeleteDatabaseCtrl', ['$scope', '$mdDialog', 'DbService','$rootScope','navigationService', DeleteDatabaseCtrl]);

function DatabaseCtrl($scope, $mdDialog, databases, socket, $state,navigationService, config,DbService) {

  socket.reqDbInfo();
  $scope.databases = databases;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  navigationService.set({'state' : 'easymongo.database','value' : 'home','icon' : 'home'});
  navigationService.set({'state' : 'login','value' : 'logout','icon' : 'https'});

  $scope.$on('db-info',function(event,data){
    
    var index = _.findIndex($scope.databases,{'database' : data.database});
    data.size = (data.size).toFixed(2) + ' mb';

    $scope.databases[index].processing = false;
    $scope.databases[index].stats = {
      count : {
        val : (data.collections),
        icon : 'view_headline'
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
    navigationService.set({'state' : 'easymongo.collection','value' : data.database,'icon' : 'view_stream','params': {'database' : data.database}});

  });

  $scope.viewCollections = function(index) {
    var database = $scope.databases[index].database;
    $state.go('easymongo.collection',{'database' : database});
  };

  $scope.download = function(database){

    var url = config.apiEndPoint + '/dump',
        win = window.open(url, "_blank");

    DbService.download(database).then(function(){
      url = config.apiEndPoint + '/database/download/' + database;
      win.location.assign(url);
      setTimeout(function(){
        win.close();
      },1000);
    });

  };

  $scope.showDailogForDb = function(ev) {

    $mdDialog.show({
      controller: CreateDatabaseCtrl,
      templateUrl: 'app/modules/dashboard/templates/createdb.view.html',
      parent: angular.element(document.body)
    }).then(function(dbname){
      databases.push({database : dbname,stats : {},processing : true});
      $scope.databases = databases;
    });

  };

  $scope.$on('db-delete',function(event,data){
    var index = _.findIndex(databases,{'database' : data.database});
    $scope.databases.splice(index,1);
    $scope.$apply();
  });
  
  $scope.deleteDb = function(dbName,index) {


    $mdDialog.show({
      controller: DeleteDatabaseCtrl,
      templateUrl: 'app/modules/dashboard/templates/deletedb.view.html',
      parent: angular.element(document.body),
      resolve : {
        database : function(){
          return dbName;
        }
      }
    }).then(function(){
      $scope.databases[index].processing = true;
    },function(err){
      console.log(err);
    })
  };
}

function CreateDatabaseCtrl($scope, $mdDialog, DbService,$rootScope) {

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.create = function() {

    var msg = 'Creating database ' + $scope.dbname,
        finished = 'Created database ' + $scope.dbname,
        key = 'create-database-' + $scope.dbname;

    $rootScope.$broadcast('notification',{'msg' : msg,'key' : key,'complete': false,'finished' : finished});
    DbService.create($scope.dbname).then(function(){
      $mdDialog.hide($scope.dbname);
    });
  };

}

function DeleteDatabaseCtrl($scope, $mdDialog, DbService,database,$rootScope,navigationService) {
  
  $scope.db = {
    'name' : database
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.delete = function() {
    
    var msg = 'Deleting database ' + database,
        finished = 'Deleted database ' + database,
        key = 'delete-database-' + database;

    navigationService.remove('easymongo.collection',{'database':database});
    $rootScope.$broadcast('notification',{'msg' : msg,'key' : key,'complete': false,'finished' : finished});

    DbService.delete($scope.db)
      .then(function(result) {
        $mdDialog.hide();
      },function() {
        console.log("error");
      });
    
  };


}