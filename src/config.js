if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define({
    vendors: {
        main: [
            'vendor/requirejs/require.js',
            'vendor/angular/angular.js',
        ],
        library: [
            'vendor/angular-route/angular-route.js',
            'vendor/jquery/dist/jquery.js'
        ]
    },
    requirejs: {
        baseUrl: '',
        paths: {
            'home': 'modules/home'
        },
        shim: {}
    }
});
