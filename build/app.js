(function(define) {
  "use strict";

  define([
      'tP/test',
    ],
    function(test) {
      var app, appName = 'app.Name';

      var depen = [
        'templatescache'
      ];

      app = angular
        .module(appName, depen);

      angular.bootstrap(document.getElementsByTagName("body")[0], [appName]);

      return app;
    }
  );

}(define));
