'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$mdDialog','databases','socket', DashboardCtrl])
 .controller('CreateDatabaseCtrl', ['$scope', '$mdDialog', 'toaster','DbService', CreateDatabaseCtrl]);


function DashboardCtrl($scope, $mdDialog, databases,socket) {

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
      targetEvent: ev,
      clickOutsideToClose:true
    });

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