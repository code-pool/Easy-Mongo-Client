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
      $rootScope.$broadcast('db-info',data);
      $rootScope.$broadcast('notification-complete',('create-database-' + data.database));
    });

    connection.on('collection-info',function(data){
      $rootScope.$broadcast('collection-info',data);
      $rootScope.$broadcast('notification-complete',('create-collection-' + data.collection));
    });

    connection.on('db-create',function(data){
      $rootScope.$broadcast('db-create',data);
    });

    connection.on('db-delete',function(data){
      $rootScope.$broadcast('db-delete',data);
      $rootScope.$broadcast('notification-complete',('delete-db-' + data.database));
    });

    connection.on('collection-delete',function(data){
      $rootScope.$broadcast('collection-delete',data);
      $rootScope.$broadcast('notification-complete',('delete-collection-' + data.collection));
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