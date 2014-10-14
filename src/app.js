(function (define) {
    "use strict";

    define([
            'home/homeModule',
        ],
        function (homeModule) {
            var app, appName = 'app.Name';

            var depen = [
                'ngRoute',
                'templatescache',

                homeModule
            ];

            app = angular
                .module(appName, depen);

            angular.bootstrap(document.getElementsByTagName("body")[0], [appName]);

            return app;
        }
    );

}(define));
