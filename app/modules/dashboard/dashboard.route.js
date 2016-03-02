'use strict';

angular
 .module('dashboard')
 .config(['$stateProvider', stateProvider]);
 
 function stateProvider($stateProvider) {

	$stateProvider
		.state('dashboard', {
			url : '/dashboard',
			views : {
				'@' : {
					controller : 'DashboardCtrl',
					templateUrl : 'app/modules/dashboard/templates/dashboard.view.html'		  				
				}
			}  
		});
        
}