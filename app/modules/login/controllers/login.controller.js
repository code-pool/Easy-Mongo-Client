'use strict';

angular
 .module('login')
 .controller('LoginCtrl', ['$scope', '$state', 'AuthService','storageService','socket','$rootScope', LoginCtrl]);

function LoginCtrl($scope, $state, AuthService,storageService,socket,$rootScope) {
	
    $scope.user = {};
    $rootScope.login = true;

    $scope.submit = function() {
        
      AuthService.login($scope.user).then(function(response){
        storageService.store('token',response.data.token);
        storageService.store('id',response.data.id);
        socket.initialize();
        $rootScope.login = false;
        $state.go('dashboard');
      },function(err){
        console.log(err)
      });
            
    }
}