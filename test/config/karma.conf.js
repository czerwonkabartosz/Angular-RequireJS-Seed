module.exports = function (config) {

    config.set({
        basePath: '../../build/',
        frameworks: ['jasmine', 'requirejs'],
        files: [

            // For Gulp-Inject
            //inject:test-vendors-files
            'vendor/requirejs/require.js','vendor/angular/angular.js','vendor/angular-route/angular-route.js','vendor/jquery/dist/jquery.js','../src/vendor/angular-mocks/angular-mocks.js',
            //end-inject:test-vendors-files

            'templates.js',
            {pattern: '**/*.js', included: false},
            {pattern: '../test/specs/**/*Spec.js', included: true},


            '../test/config/karmaBoot.js'
        ],
        exclude: [],
        port: 9876,
        runnerPort: 9100,
        reporters: ['dots'],
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // - process.env.TRAVIS
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false


    });
};
