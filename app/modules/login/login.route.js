'use strict';

angular
 .module('login')
 .config(['$stateProvider', stateProvider]);

function stateProvider($stateProvider) {

	$stateProvider
		.state('login', {
			url : '/login',
			views : {
				'@' : {
					controller : 'LoginCtrl',
					templateUrl : 'app/modules/login/templates/login.view.html'		  				
				}
			}  
		});
}