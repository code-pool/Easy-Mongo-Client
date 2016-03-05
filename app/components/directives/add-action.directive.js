'use strict';

angular
    .module('directives')
    .directive('addAction', ['$mdSidenav', AddAction]);
   
function AddAction($mdSidenav) {
    return {
        restrict: 'EA',
        templateUrl: 'app/components/partials/add-action.partial.html',
        link : linkFunc
    };

    function linkFunc($scope, $elem, $attr) {
        
      $elem.bind('click', function() {
        
        if($attr.callCtrlMethod) {
          $scope.$eval($attr.callCtrlMethod);  
        } else {
          console.warn('Pass name of the method you want to call');
        }

      });
      
    }
}
