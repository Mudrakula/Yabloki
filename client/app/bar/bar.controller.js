'use strict';

angular.module('yablokiApp')
  .controller('BarCtrl', function($scope, $http) {
    $scope.orders = [];

    $scope.getOrders = function() {
      $http.get('/api/orders').then(function(result) {
        $scope.orders = _.map(result.data, function(item) {
          item.products = angular.fromJson(item.products);
          item.products = _.filter(item.products, function(product) {
            return product.type == 'bar';
          });
          return item;
        });
        console.log($scope.orders);
      });
    };

    $scope.getOrders();
});