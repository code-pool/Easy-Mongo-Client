'use strict';

angular
 .module('services')
 .factory('AuthService', ['$state', '_', AuthService]);

function AuthService($state, _) {
	return {
        login : Login,
        logout : Logout
    }
    
    function Login(user) {
        
    }

    function Logout() {
        
    }
    
}

