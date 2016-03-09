'use strict';

angular
    .module('directives')
    .directive('spotLight', ['$state','navigationService', SpotLight])
    .filter('titleCase', function() {
      return function(input) {
        input = input || '';
        return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      };
    });

function SpotLight($state,navigationService){
  return {
      restrict: 'E',
      templateUrl: 'app/components/partials/spotlight.partial.html',
      transclude : true,
      link : linkFunc
  };

  function linkFunc($scope,$elem,$attrs){

    $scope.__spotLightActive = false;   
    $scope.querySearch = querySearch;
    $scope.searchText = '';
    $scope.redirect = redirect;
    $scope.routes = navigationService.routes();

    $scope.$on('routes-update',function(event,list){
      $scope.routes = list;
    });

    var body = document.querySelector('body'),
        previous = null;
        
    body.onkeydown = function (e) {

      if($state.current.name == 'login') {
        return;
      }
      
      if(previous == 17 && e.keyCode == 32) {
        $scope.__spotLightActive = true;
        e.preventDefault();
        $scope.$apply();
        $('#input-0').focus();
        return;
      }

      previous = e.keyCode;
      
      if(previous == 27) {
        reset();
        $scope.$apply();
      }
    };

    function querySearch (query) {
      return query ? $scope.routes.filter( createFilterFor(query) ) : $scope.routes;
    }

    function redirect(state,params){
      if(!state){
        return;
      }
      $state.go(state,params);
      reset();
    }

    function reset(){
      $scope.searchText = '';
      $scope.__spotLightActive = false;
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(route) {
        return (route.value.indexOf(lowercaseQuery) === 0);
      };
    }

  }
}