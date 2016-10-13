'use strict';

angular.module('yablokiApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.products = [];
    $scope.order = {};

    $scope.addProduct = function(product, count) {
      $scope.order.products.push(product);
    };

    $scope.getBill = function(order) {
      var bill = 0;
      $scope.order.products.forEach(function(item, i, arr) {
        bill += item.price;
      });
    };
  });
