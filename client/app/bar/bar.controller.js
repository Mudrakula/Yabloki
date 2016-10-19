'use strict';

angular.module('yablokiApp')
  .controller('BarCtrl', function($scope, $http, $interval) {
    $scope.orders = [];
    $scope.status = {
      '-1': 'Canceled',
      0: 'Pending',
      1: 'Done',
      2: 'Delivered'
    };

    $scope.getOrders = function() {
      $http.get('/api/orders/bar').then(function(result) {
        $scope.orders = _.map(result.data, function(item) {
          item.products = angular.fromJson(item.products);
          item.products = _.filter(item.products, function(product) {
            return product.type == 'bar';
          });
          return item;
        }).filter(function(item) {
          return item.products.length > 0;
        });
      });
    };

    $scope.productReady = function(order, product) {
      product.status = 1;
      var barStatus = _.filter(order.products, function(item) {
        return item.status < 1;
      }).length > 0 ? 0 : 1;
      var products = angular.toJson(order.products);
      $http.post('/api/orders/product_ready', {
        order: order.id,
        products: products,
        type: 'bar_status',
        status: barStatus
      }).then(function(result) {
        if (result.status === 200 && barStatus == 1)
          $scope.orders = _.filter($scope.orders, function(item) {
            return item.id !== order.id;
          });
      });
    };

    $scope.go = function(order) {
      $http.post('/api/orders/done', {
        id: order.id,
        type: 'bar_status'
      }).then(function(result) {
        $scope.orders = _.filter($scope.orders, function(item) {
          return item.id !== order.id;
        });
      });
    };

    $scope.getOrders();

    $interval(function() {
      $scope.getOrders();
    }, 60000);
});