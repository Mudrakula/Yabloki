'use strict';

angular.module('yablokiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('kitchen', {
        url: '/kitchen',
        templateUrl: 'app/kitchen/kitchen.html',
        controller: 'KitchenCtrl'
      });
  });