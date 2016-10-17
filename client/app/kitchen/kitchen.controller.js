'use strict';

angular.module('yablokiApp')
  .controller('KitchenCtrl', function($scope, $http) {
    $scope.orders = [];

    $scope.getOrders = function() {
      $http.get('/api/orders').then(function(result) {
        $scope.orders = _.map(result.data, function(item) {
          item.products = angular.fromJson(item.products);
          item.products = _.filter(item.products, function(product) {
            return product.type == 'dish';
          });
          return item;
        });
        console.log($scope.orders);
      });
    };

    $scope.getOrders();
});