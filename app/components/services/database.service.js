'use strict';

angular
 .module('services')
 .factory('DbService', ['$state', '_','$http','config', DbService]);

function DbService($state, _,$http,config) {
  
    return {
      list : List,
    }
    
    function List(user) {
      var url = config.apiEndPoint + '/';
      return $http.get(url);
    }
    
}

