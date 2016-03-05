'use strict';

angular
 .module('services')
 .factory('DbService', ['$state', '_','$http','config','$q', DbService]);

function DbService($state, _,$http,config,$q) {
  
    return {
      list : List,
      delete : Delete
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

    function Delete(db) {

      var defer = $q.defer();
      var url = config.apiEndPoint + '/database?database=' + db.name + '&secret=' + db.secret;

      $http.delete(url).then(function(response){
        defer.resolve(response.data);
      },function(err){
        defer.resolve([]);
      });

      return defer.promise;
    }
    
}

