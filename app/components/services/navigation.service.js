angular.module('services')
     .service('navigationService',['config','$http','$state','storageService','$rootScope',NavigationService]);

function NavigationService(config,$http,$state,storageService,$rootScope) {

  var service = {};
  service.routes = routes;
  service.remove = remove;
  service.set = set;
  return service;

  function routes(){
    var list = storageService.get('routes');
    if(list){
      list = JSON.parse(list);
    }
    list = list || [];
    return list;
  }

  function remove(state,params) {

    var list = routes(),
        len = list.length;

    while(len--) {
      if(state == list[len].state && equal(params,list[len].params)) {
        list.splice(len,1);
        break;
      }
    }

    storageService.set('routes',JSON.stringify(list));
    $rootScope.$broadcast('routes-update',list);

  }

  function set(config) {
    
    var obj = {
      'value' : config.value,
      'icon' : config.icon,
      'state' : config.state,
      'params' : config.params || {}
      },
      exist = false,
      list = routes(),
      len = list.length;

    while(len--) {
      if(obj.state == list[len].state && equal(obj.params,list[len].params)) {
        exist = true;
        break;
      }
    }

    if(exist) {
      return;
    }

    list.push(obj);
    storageService.set('routes',JSON.stringify(list));
    $rootScope.$broadcast('routes-update',list);

  }

  function equal(one,two) {

    var keysOne = Object.keys(one),
        keysTwo = Object.keys(two),
        areEqual = true,
        len = keysOne.length;

    while(len--) {
      if(one[keysOne[len]] !== two[keysOne[len]]) {
        areEqual = false;
        break;
      }
    }

    return areEqual;
  }


}