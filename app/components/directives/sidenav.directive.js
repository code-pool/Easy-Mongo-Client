'use strict';

angular
    .module('directives')
    .directive('sideNav', ['$mdSidenav','$rootScope', SideNav]);
   
function SideNav($mdSidenav,$rootScope) {
    return {
        restrict: 'EA',
        templateUrl: 'app/components/partials/side-nav.partial.html',
        link : linkFunc
    };

    function linkFunc($scope, $elem, $attr) {
      

      $rootScope.$watch('login',function(newVal){

        if(newVal){
          $mdSidenav('right').close();
          $scope.hide = true;
          return;
        }
        
        $scope.hide = false;
      })

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
}
