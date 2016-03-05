angular.module('services')
     .service('AuthService',['config','$http','$state','storageService',authService]);

function authService(config,$http,$state,storageService) {
  
  var service = {};
  service.login = login;
  service.logout = logout;
  service.postLogout = postLogout;
  return service;

  function login(user) {
    return $http(
      {
        'method' : 'POST',
        'url' : config.apiEndPoint + '/login',
        'data' : user,
        'headers' : {
          'Content-Type' : 'application/json'
        } 
      }
    );
  }

  function logout() {
    return $http(
      {
        'method' : 'POST',  
        'url' : config.apiEndPoint + '/logout',
        'data' : {
          'token' : storageService.get('token')
        },
        'headers' : {
          'Content-Type' : 'application/json'
        } 
      }
    );
  }

  function postLogout() {
    storageService.clear();
    $state.transitionTo('login');
  }
}