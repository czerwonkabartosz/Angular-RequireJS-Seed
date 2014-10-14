if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define({
    main: [
        'vendor/requirejs/require.js',
        'vendor/angular/angular.js',
    ],
    vendors: [
        'vendor/angular-route/angular-route.js'
    ]
});
