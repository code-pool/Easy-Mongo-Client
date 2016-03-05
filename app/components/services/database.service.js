'use strict';

angular
 .module('services')
 .factory('DbService', ['$state', '_','$http','config','$q', DbService]);

function DbService($state, _,$http,config,$q) {
  
    return {
      list : List,
    }
    
    function List(user) {
      var defer = $q.defer();
      var url = config.apiEndPoint + '/';
      $http.get(url).then(function(response){
        defer.resolve(response.data);
      },function(err){
        defer.resolve([]);
      });
      return defer.promise;
    }
    
}

