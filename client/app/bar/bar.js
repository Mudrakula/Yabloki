'use strict';

angular.module('yablokiApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('bar', {
        url: '/bar',
        templateUrl: 'app/bar/bar.html',
        controller: 'BarCtrl'
      });
  });