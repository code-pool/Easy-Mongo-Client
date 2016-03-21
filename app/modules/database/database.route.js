'use strict';

angular
 .module('database')
 .config(['$stateProvider', stateProvider]);
 
 function stateProvider($stateProvider) {

	$stateProvider
		.state('easymongo.database',{
			url : '/database',
			views : {
				'content' : {
					controller : 'DatabaseCtrl',
					templateUrl : 'app/modules/database/templates/database.view.html',
					resolve : {

						databases : function(DbService){
							return DbService.list();
						},

						initSocket : function(socket) {
							socket.initialize();
						}
					}
				}
			}  
		});
        
}