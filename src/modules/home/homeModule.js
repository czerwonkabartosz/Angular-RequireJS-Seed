(function(define) {
  'use strict';

  define([
      'home/controllers/homeController',
      'home/services/homeService',
      'home/homeRoute'
    ],
    function(HomeController, HomeService, homeRoute) {
      var moduleName = 'Home';

      angular.module(moduleName, [])
        .config(homeRoute)
        .controller('HomeController', HomeController)
        .service('HomeService', HomeService);

      return moduleName;
    });

}(define));
