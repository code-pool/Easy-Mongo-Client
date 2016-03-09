'use strict';

angular
    .module('directives')
    .directive('sideNav', ['$mdSidenav','$rootScope','notificationService','storageService',SideNav])
    .directive('alertPopup', ['$mdToast',alertPopup]);
   
function SideNav($mdSidenav,$rootScope,notificationService,storageService) {
    return {
        restrict: 'EA',
        templateUrl: 'app/components/partials/side-nav.partial.html',
        link : linkFunc
    };

    function linkFunc($scope, $elem, $attr) {

      $scope.notifications = notificationService.list();
      $scope.toggleRight = buildToggler('left');
      
      $scope.isOpenRight = function(){
        return $mdSidenav('left').isOpen();
      };

      $scope.close = function () {
        $mdSidenav('left').close();
      };

      $scope.onAddClick = function(){
        $scope.$eval($attr.addClickMethod);
      };

      $scope.removeNotf = function(key){
        
        var notifications = notificationService.list(),
            len = notifications.length;
        
        while(len--){
          if(key == notifications[len].key) {
            notifications.splice(len,1);
            break;
          }
        }

        $scope.notifications = notifications;
        storageService.set('notifications',JSON.stringify($scope.notifications));
      };

      $rootScope.$watch('login',function(newVal){

        if(newVal){
          $mdSidenav('left').close();
          $scope.hide = true;
          return;
        }
        
        $scope.hide = false;
      });

      $scope.$on('notification',function(event,data){
        $scope.notifications.push(data);
        storageService.set('notifications',JSON.stringify($scope.notifications));
      });

      $scope.$on('notification-complete',function(event,key){

        var notifications = notificationService.list(),
            len = notifications.length,
            msg;

        while(len--){
          if(key == notifications[len].key) {
            msg = notifications[len].finished || notifications[len].msg;
            if(!notifications[len].complete) {
              notifications[len].complete = true;  
              notificationService.emit(msg);
            }
            notifications[len].msg = notifications[len].finished || notifications[len].msg;            
            break;
          }
        }
        $scope.notifications = notifications;
        storageService.set('notifications',JSON.stringify($scope.notifications));
        $scope.$apply();
      });


      function buildToggler(navID) {
        return function() {
          $mdSidenav(navID).toggle();
        }
      }
    }
}

//TODO move this to separate file
function alertPopup($mdToast) {

    return {
        restrict: 'E',
        link : linkFunc
    };

    function linkFunc($scope,$elem,$attrs){
      $scope.$on('alert',function(event,msg){
        var toast = $mdToast.simple().textContent(msg).position('top right');
        $mdToast.show(toast);
      });
    }
}
