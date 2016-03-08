'use strict';

angular
    .module('directives')
    .directive('sideNav', ['$mdSidenav','$rootScope','notificationService','storageService', SideNav]);
   
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
            len = notifications.length;
        while(len--){
          if(key == notifications[len].key) {
            notifications[len].complete = true;
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
