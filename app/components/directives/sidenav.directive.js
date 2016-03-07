'use strict';

angular
    .module('directives')
    .directive('sideNav', ['$mdSidenav','$rootScope','$parse', SideNav]);
   
function SideNav($mdSidenav,$rootScope,$parse) {
    return {
        restrict: 'EA',
        templateUrl: 'app/components/partials/side-nav.partial.html',
        link : linkFunc
    };

    function linkFunc($scope, $elem, $attr) {
      
      $scope.onAddClick = function(){
        $scope.$eval($attr.addClickMethod);
      };

      $rootScope.$watch('login',function(newVal){

        if(newVal){
          $mdSidenav('left').close();
          $scope.hide = true;
          return;
        }
        
        $scope.hide = false;
      })

      $scope.toggleRight = buildToggler('left');
      
      $scope.isOpenRight = function(){
        return $mdSidenav('left').isOpen();
      };

      $scope.close = function () {
        $mdSidenav('left').close();
      };

      function buildToggler(navID) {
        return function() {
          $mdSidenav(navID).toggle();
        }
      }
    }
}
