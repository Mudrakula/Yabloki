'use strict';

angular.module('yablokiApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.categories = [];
    $scope.pickedCategory = false;
    $scope.products = [];
    $scope.currentOrder = false;
    $scope.order = {
      products: [],
      customer: 2
    };
    $scope.details = false;

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

    $scope.getOrder = function() {
      $http.post('/api/orders/current', {
        customer: $scope.order.customer
      }).then(function(result) {
        if (result.data !== null) {
          $scope.currentOrder = result.data;
          $scope.currentOrder.products = angular.fromJson(result.data.products);
        }
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

    $scope.addProduct = function(product, type) {
      product.count = product.count || 1;
      product.status = 0;
      product.type = type;
      $scope.order.products.push(_.clone(product));
      product.count = 1;
    };

    $scope.removeProduct = function(product) {
      $scope.order.products = _.filter($scope.order.products, function(item) {
        return item !== product;
      });
    };

    $scope.getBill = function(order) {
      var bill = 0;
      order.products.forEach(function(item, i, arr) {
        bill += item.price * (item.count || 1);
      });

      return bill;
    };

    $scope.go = function(order) {
      if ($scope.currentOrder) {
        var totalProducts = $scope.currentOrder.products.concat($scope.order.products);
        $http.post('api/orders/update', {
          id: $scope.currentOrder.id,
          time: Date.now(),
          products: angular.toJson(totalProducts)
        }).then(function(result) {
          if (result.status === 200) {
            $scope.currentOrder.products = totalProducts;
            $scope.order = {
              products: []
            };
          }
        });
      } else {
        $http.post('/api/orders', {
          time: Date.now(),
          products: angular.toJson(order.products),
          customer: order.customer
        }).then(function(result) {
          if (result.status === 200)
            $scope.currentOrder = result.data;
            $scope.order = {
              products: []
            };
        });
      }
    };

    $scope.showDetails = function(order) {
      $scope.details = ! $scope.details;
    };

    $scope.getCategories();
    $scope.getProducts();
    $scope.getOrder();
  });
