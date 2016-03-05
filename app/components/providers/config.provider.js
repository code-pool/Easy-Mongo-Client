angular.module('providers')
       .provider('config',[configProvider]);

function configProvider() {

  var config = window.__config || {};

  this.$get = function() {
    return {
      apiEndPoint : 'http://localhost:3000',
      socketEndPoint : 'http://localhost:3000'
    };    
  };

}