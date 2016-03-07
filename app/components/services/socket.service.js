angular.module('services')
       .factory('socket',['config','storageService','$rootScope',socketFactory]);

function socketFactory(config,storageService,$rootScope) { 

  var service = {},
      connected = false,
      connection,
      userId = storageService.get('id');
  service.connect = Connect;
  service.disconnect = Disconnect;
  service.isconnected = IsConnected;
  service.initialize = Initialize;
  service.reqDbInfo = ReqDbInfo;
  return service;

  function Connect(){
    connection = io.connect(config.socketEndPoint);
    connected = true;
    AttachListener();
  };

  function Disconnect() {

  };

  function AttachListener() {

    connection.on('db-info',function(data){
      var key = 'create-database-' + data.database;
      $rootScope.$broadcast('db-info',data);
      $rootScope.$broadcast('notification-complete',key);
    });

    connection.on('collection-info',function(data){
      var key = 'create-collection-' + data.collection;
      $rootScope.$broadcast('collection-info',data);
      $rootScope.$broadcast('notification-complete',key);
    });

    connection.on('db-create',function(data){
      $rootScope.$broadcast('db-create',data);
    });

    connection.on('db-delete',function(data){
      var key = 'delete-database-' + data.database;
      $rootScope.$broadcast('db-delete',data);
      $rootScope.$broadcast('notification-complete',key);
    });

    connection.on('collection-delete',function(data){
      var key = 'delete-collection-' + data.collection;
      $rootScope.$broadcast('collection-delete',data);
      $rootScope.$broadcast('notification-complete',key);
    });
  };

  function ReqDbInfo() {
    connection.emit('db-info');
  }

  function IsConnected() {
    return connected;
  };

  function Initialize() {
    if(IsConnected()) {
      return;
    }
    Connect();
  };

}