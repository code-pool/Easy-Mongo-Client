'use strict';

angular
 .module('login')
 .controller('LoginCtrl', ['$scope', '$state', 'AuthService', LoginCtrl]);

function LoginCtrl($scope, $state, AuthService) {
	
    $scope.user = {};
    
    $scope.submit = function() {
        
      AuthService.login($scope.user).then(function(response){
        $state.go('dashboard');
      },function(err){
        console.log(err)
      });
            
    }
}