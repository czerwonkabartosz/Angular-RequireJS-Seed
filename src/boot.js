(function () {
    "use strict";
    $script([
            //inject:vendors-main-files
            //end-inject:vendros-main-files
        ],
        function () {
            $script(
                [
                    //inject:vendors-files
                    //end-inject:vendros-files
                ],
                function () {
                    $script(
                        [
                            //inject:app-files
                            //end-inject:app-files
                        ],
                        function () {
                            //inject:require-build-config
                            //end-inject:require-build-config

                            require(["app"], function (app) {

                            });
                        });
                });
        });
}());
