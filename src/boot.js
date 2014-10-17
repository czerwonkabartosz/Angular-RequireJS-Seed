(function () {
    "use strict";
    $script([
            // For Gulp-Inject
            //inject:vendors-main-files
            //end-inject:vendors-main-files
        ],
        function () {
            $script(
                [
                    // For Gulp-Inject
                    //inject:vendors-files
                    //end-inject:vendors-files
                ],
                function () {
                    $script(
                        [
                            // For Gulp-Inject
                            //inject:app-files
                            //end-inject:app-files
                        ],
                        function () {
                            // For Gulp-Inject
                            //inject:require-build-config
                            //end-inject:require-build-config

                            require(["app"], function (app) {

                            });
                        });
                });
        });
}());
