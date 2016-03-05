'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$state','databases','socket', DashboardCtrl]);

function DashboardCtrl($scope, $state, databases,socket) {
  console.log(databases);
  socket.reqDbInfo();
}