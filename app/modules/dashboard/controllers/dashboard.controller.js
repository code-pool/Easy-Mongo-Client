'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$state','databases','socket','_','$mdBottomSheet', DashboardCtrl])
.controller('GridBottomSheetCtrl', ['$scope','$mdBottomSheet',GridBottomSheetCtrl]);
function DashboardCtrl($scope, $state, databases,socket,_,$mdBottomSheet) {
  $scope.databases = databases;
  socket.reqDbInfo();
  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  $scope.$on('db-info',function(event,data){
    var index = _.findIndex(databases,{'db_name' : data.name});
    data.size = parseInt(data.size) + ' mb';
    $scope.databases[index].stats = data;
  });

  $scope.showGridBottomSheet = function(db) {
    db.selected = true;
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: 'app/modules/dashboard/templates/actions.view.html',
      controller: 'GridBottomSheetCtrl',
      clickOutsideToClose: true
    }).then(function(clickedItem) {
      db.selected = false;
    },function(){
      db.selected = false;
    });
  }
}

function GridBottomSheetCtrl($scope, $mdBottomSheet) {

  $scope.items = [
    { name: 'Delete', icon: 'delete' },
    {name: 'Rename  ', icon:'mode_edit'}
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
}