angular.module('services')
     .service('notificationService',['config','$http','$state','storageService',NotificationService]);

function NotificationService(config,$http,$state,storageService) {

  var service = {};
  service.list = list;
  service.set = set;
  service.remove = remove;
  return service;

  function list(){
    var items = storageService.get('notifications');
    if(items){
      return JSON.parse(items);
    }
    return [];
  }

  function remove(key){
    var items = list(),
        len = items.length;
    while(len--) {
      if(items[len].key == key) {
        items.splice(len,1);
        break;
      }
    }
    storageService.set('notifications',JSON.stringify(items));
  }

  function set(key,msg){
    var items = list();
    items.push({key : key,msg:msg});
    storageService.set('notifications',JSON.stringify(items));
  }

}