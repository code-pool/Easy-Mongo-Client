'use strict';

angular
 .module('services')
 .factory('AuthService', ['$state', '_', 'Credential', AuthService]);

function AuthService($state, _, Credential) {
	return {
        login : Login,
        logout : Logout
    }
    
    function Login(user) {
      if (_.isEqual(Credential.username, user.username) && _.isEqual(Credential.password, user.password)) {
          $state.go('dashboard');
      }
    }

    function Logout() {
        
    }
    
}

