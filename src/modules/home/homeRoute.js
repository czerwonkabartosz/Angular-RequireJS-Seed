(function (define) {
    "use strict";

    define([], function () {
        return ['$routeProvider', Route];


        function Route($routeProvider) {
            $routeProvider.
                when('/home', {
                    templateUrl: 'modules/home/views/index.tpl.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                })
                .otherwise({
                    redirectTo: '/home'
                });

        }
    });
}(define));
