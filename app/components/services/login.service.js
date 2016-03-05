'use strict';

angular
 .module('services')
 .factory('AuthService', ['$state', '_', 'Credential','$http','config', AuthService]);

function AuthService($state, _, Credential,$http,config) {
	return {
        login : Login,
        logout : Logout
    }
    
    function Login(user) {
      var url = config.apiEndPoint + '/login';
      return $http.post(url,user);
    }

    function Logout() {
        
    }
    
}

