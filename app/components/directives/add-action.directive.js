'use strict';

angular
    .module('directives')
    .directive('addAction', ['$mdSidenav','$parse', AddAction]);
   
function AddAction($mdSidenav,$parse) {
    return {
        restrict: 'EA',
        templateUrl: 'app/components/partials/add-action.partial.html',
        link : linkFunc
    };

    function linkFunc($scope, $elem, $attr) {
      
      $scope.onAddClick = $parse($attr.addCtrlMethod)
      $elem.bind('click', function() {
        
        if($attr.callCtrlMethod) {
          $scope.$eval($attr.callCtrlMethod);  
        } else {
          console.warn('Pass name of the method you want to call');
        }

      });
      
    }
}
