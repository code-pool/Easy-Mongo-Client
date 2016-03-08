'use strict';

angular
 .module('collection')
 .controller('CollectionCtrl', ['$scope', '$mdDialog','collections', 'socket', 'CollectionService', '$stateParams','$state','$rootScope','navigationService', CollectionCtrl])
 .controller('DocumentsCtrl',['$mdEditDialog', '$q', '$scope', '$timeout','$stateParams','documents',DocumentsCtrl]);

function CollectionCtrl($scope, $mdDialog, collections, socket, CollectionService, $stateParams,$state,$rootScope,navigationService) {

  socket.reqDbInfo();
  $scope.collections = collections;

  $scope.toggleDbSelect = function(db) {
    db.selected = !db.selected;
  };

  $scope.schema = {
    'type' : 'String'
  };

  $scope.viewDocs = function(index){
    var collection_name = $scope.collections[index].collection_name;
    $state.go('home.collection.documents',{'database' : $stateParams.database,'collection': collection_name});
  };

  $scope.$on('collection-info',function(event,data){
    var index = _.findIndex(collections,{'collection_name' : data.collection});
    
    $scope.collections[index].stats = {
      count : {
        val : (data.count),
        icon : 'assignment',
        clickAction : 'viewDocs(col.collection_name)'
      },
      verified : {
        val : (data.verified) ? 'Verified' : 'Not verified',
        icon : (data.verified) ? 'check_circle' : 'warning'
      }
    };
    $scope.$apply();
    var value = data.collection + ' (' + $stateParams.database + ')';
    navigationService.set({'state' : 'home.collection.documents','value' : value,'icon' : 'view_headline','params': {'database' : $stateParams.database,'collection' : data.collection}});
    delete data.collection;
  });

  $scope.$on('collection-delete',function(event,data){
    var index = _.findIndex(collections,{'collection_name' : data.collection});
    $scope.collections.splice(index,1);
  });

  $scope.deleteCollection = function(colName) {

    var confirm = $mdDialog.confirm()
        .title('Would you like to delete your Collection?')
        .textContent('All the important data from this collection will be lost')
        .ariaLabel('Are you sure')
        .ok('Yes')
        .cancel('No');
    $mdDialog.show(confirm).then(function() {

      var msg = 'Deleting collection ' + colName,
        key = 'delete-collection-' + colName,
        finished = 'Deleted collection ' + colName;

      navigationService.remove('home.collection.documents',{'database':$stateParams.database,'collection' : colName});
      $rootScope.$broadcast('notification',{'msg' : msg,'key' : key,'complete': false,'finished' : finished});

      CollectionService.delete($stateParams.database, colName);

    }, function() {
      console.log('cancel');
    });
  };

  $scope.addCollection = function(){
    $mdDialog.show({
      controller: CreateCollectionCtrl,
      resolve : {
        'collections' : function(){
          return collections
        }
      },
      templateUrl: 'app/modules/collection/templates/createcol.view.html',
      parent: angular.element(document.body),
      clickOutsideToClose:false
    }).then(function(col_name){
      collections.push({'collection_name' : col_name,'stats' : {}});
      $scope.collections = collections;
    })
  };
}

function DocumentsCtrl($mdEditDialog, $q, $scope, $timeout,$stateParams,documents){

  $scope.collection_name = $stateParams.collection;
  var keys = Object.keys(documents[0]);
  keys = _.reject(keys,function(keyVal){
    return keyVal == '_id';
  });
  $scope.keys = keys;
  $scope.rows = documents;

$scope.selected = [];
  
  $scope.options = {
    autoSelect: true,
    boundaryLinks: true,
    largeEditDialog: true,
    pageSelector: true,
    rowSelection: true
  };
  
  $scope.query = {
    order: keys[0],
    limit: 5,
    page: 1
  };
  
  
  $scope.editComment = function (event, dessert) {
    event.stopPropagation(); // in case autoselect is enabled
    
    var editDialog = {
      modelValue: dessert.comment,
      placeholder: 'Add a comment',
      save: function (input) {
        if(input.$modelValue === 'Donald Trump') {
          return $q.reject();
        }
        if(input.$modelValue === 'Bernie Sanders') {
          return dessert.comment = 'FEEL THE BERN!'
        }
        dessert.comment = input.$modelValue;
      },
      targetEvent: event,
      title: 'Add a comment',
      validators: {
        'md-maxlength': 30
      }
    };
    
    var promise;
    
    if($scope.options.largeEditDialog) {
      promise = $mdEditDialog.large(editDialog);
    } else {
      promise = $mdEditDialog.small(editDialog);
    }
    
    promise.then(function (ctrl) {
      var input = ctrl.getInput();
      
      input.$viewChangeListeners.push(function () {
        input.$setValidity('test', input.$modelValue !== 'test');
      });
    });
  };
  
  $scope.getTypes = function () {
    return ['Candy', 'Ice cream', 'Other', 'Pastry'];
  };
  
  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
  }
  
  $scope.logItem = function (item) {
    console.log(item.name, 'was selected');
  };
  
  $scope.logOrder = function (order) {
    console.log('order: ', order);
  };
  
  $scope.logPagination = function (page, limit) {
    console.log('page: ', page);
    console.log('limit: ', limit);
  }
}

function CreateCollectionCtrl($scope,$mdDialog,collections,_,CollectionService,$stateParams,$rootScope){

  $scope.types = [
    'String',
    'Number',
    'Array',
    'Object',
    'Date',
    'Boolean'
  ];

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.schema = {
    'collection' : '',
    'fields' : [{
      'key' : '',
      'type' : 'String',
      'required' : true,
      'alias' : ''
    }]
  };

  $scope.addField = function(){
    $scope.schema.fields.push({
      'key' : '',
      'type' : 'String',
      'required' : true,
      'alias' : ''      
    });
  };

  $scope.deleteField = function(index){
    $scope.schema.fields.splice(index,1);
  };

  $scope.createSchema = function(){

    var index = _.findIndex(collections,{'collection_name' : $scope.schema.collection});
    if(index >= 0) {
      return;
    }

    var msg = 'Creating collection ' + $scope.schema.collection,
        key = 'create-collection-' + $scope.schema.collection;

    $rootScope.$broadcast('notification',{'msg' : msg,'key' : key,'complete': false});

    CollectionService.add($stateParams.database,$scope.schema).then(function(){
      $mdDialog.hide($scope.schema.collection);
    },function(err){
      console.log(err);
    });

    
  };


};