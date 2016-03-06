'use strict';

angular
 .module('services')
 .factory('DocumentService', ['$state', '_','$http','config','$q', DocumentService]);

function DocumentService($state, _, $http, config, $q) {
  
    return {
      list : List,
      create : Create,
      delete : Delete,
      add : Add
    };
    
    function List(db_name,col_name) {
      var defer = $q.defer();
      var url = config.apiEndPoint + '/' + db_name + '/' + col_name;
      $http.get(url).then(function(response){
        defer.resolve(response.data);
      },function(err){
        defer.resolve([]);
      });
      return defer.promise;
    }

    function Delete(db_name, col_name) {

      var defer = $q.defer();
      var url = config.apiEndPoint + '/' + db_name + '/' + col_name;

      $http.delete(url).then(function(response){
        defer.resolve(response.data);
      },function(err){
        defer.resolve([]);
      });

      return defer.promise;
      
    }

    function Add(){


    }

    function Create() {

    }
    
}

