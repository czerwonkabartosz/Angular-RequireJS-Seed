(function (define) {
    "use strict";

    define([], function () {
        return ['$routeProvider', Route];


        function Route($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: 'modules/home/views/index.tpl.html',
                    controllerAs: 'HomeController'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        }
    });
}(define));
