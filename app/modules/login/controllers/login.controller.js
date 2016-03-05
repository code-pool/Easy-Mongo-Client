'use strict';

angular
 .module('login')
 .controller('LoginCtrl', ['$scope', '$state', 'AuthService','storageService','socket', LoginCtrl]);

function LoginCtrl($scope, $state, AuthService,storageService,socket) {
	
    $scope.user = {};
    
    $scope.submit = function() {
        
      AuthService.login($scope.user).then(function(response){
        storageService.store('token',response.data.token);
        storageService.store('id',response.data.id);
        socket.initialize();
        $state.go('dashboard');
      },function(err){
        console.log(err)
      });
            
    }
}