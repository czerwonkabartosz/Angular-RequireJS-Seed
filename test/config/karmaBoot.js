(function (angular, requirejs) {
    "use strict";


    // For Gulp-Inject
    //inject:require-test-config
    requirejs.config({"baseUrl":"/base","paths":{"home":"modules/home"},"shim":{}});
    //end-inject:require-test-config


    require(['app'], function (app) {
        window.__karma__.start();

    });

})(angular, requirejs);