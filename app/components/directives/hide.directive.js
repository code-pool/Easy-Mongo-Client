'use strict';

angular
    .module('directives')
    .directive('hideDestroy', hideDestroy);
   
function hideDestroy() {
  return {
    restrict : 'A',
    link : function($scope,$elem){
      $scope.$on('$destroy',function(){
        $($elem).hide();
      });
    }
  };
}