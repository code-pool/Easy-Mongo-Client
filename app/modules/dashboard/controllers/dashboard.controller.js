'use strict';

angular
 .module('dashboard')
 .controller('DashboardCtrl', ['$scope', '$state','databases', DashboardCtrl]);

function DashboardCtrl($scope, $state, databases) {
  console.log(databases);
}