'use strict';

angular.module('yablokiApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.categories = [];
    $scope.pickedCategory = false;
    $scope.products = [];
    $scope.order = {
      products: []
    };

    $scope.getCategories = function() {
      $http.get('/api/categories').then(function(result) {
        if (result.status === 200)
          $scope.categories = _.groupBy(result.data, 'type');
      });
    };

    $scope.getProducts = function() {
      $http.get('/api/products').then(function(result) {
        if (result.status === 200)
          $scope.products = _.groupBy(result.data, 'category_id');
      });
    };

    $scope.pickCategory = function(category) {
      $scope.pickedCategory = category;
    };

    $scope.decreaseProduct = function(product) {
      product.count = product.count < 2 ? 1 : (product.count - 1);
    };

    $scope.increaseProduct = function(product) {
      product.count = ! product.count  ? 2 : (product.count + 1);
    };

    $scope.addProduct = function(product) {
      product.count = product.count || 1;
      $scope.order.products.push(_.clone(product));
      product.count = 1;
    };

    $scope.removeProduct = function(product) {
      $scope.order.products = _.filter($scope.order.products, function(item) {
        return item.id !== product.id;
      });
    };

    $scope.getBill = function(order) {
      var bill = 0;
      $scope.order.products.forEach(function(item, i, arr) {
        bill += item.price * (item.count || 1);
      });

      return bill;
    };

    $scope.go = function(order) {
      $http.post('/api/orders', {
        time: Date.now(),
        products: angular.toJson(order.products),
        customer: 1
      }).then(function(result) {
        if (result.status === 200)
          $scope.order = {
            products: []
          };
      });
    };

    $scope.getCategories();
    $scope.getProducts();
  });
