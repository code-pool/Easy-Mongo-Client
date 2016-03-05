'use strict';

angular
    .module('directives')
    .directive('sideNav', ['$mdSidenav', SideNav]);
   
function SideNav($mdSidenav) {
    return {
        restrict: 'EA',
        templateUrl: 'app/components/partials/side-nav.partial.html',
        controller : function SideNavCtrl($scope) {
        
          $scope.toggleRight = buildToggler('right');
          
          $scope.isOpenRight = function(){
            return $mdSidenav('right').isOpen();
          };

          $scope.close = function () {
            $mdSidenav('right').close();
          };

          function buildToggler(navID) {
            return function() {
              $mdSidenav(navID).toggle();
            }
          }
      }
    };
}
