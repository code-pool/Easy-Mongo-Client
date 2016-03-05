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
      console.log(data);
      $rootScope.$broadcast('db-info',data);
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