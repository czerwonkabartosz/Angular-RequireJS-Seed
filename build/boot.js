(function() {
  "use strict";

  $script(
    [
      //inject:vendors-files
      'vendor/requirejs/require.js','vendor/angular/angular.js',
      //end-inject:vendros-files
    ],
    function() {
      $script(
        [
          //inject:app-files
            "templates.js"
          //end-inject:app-files
        ],
        function() {
          //inject:require-dev-config
          //end-inject:require-dev-config

          require(["app"], function(app) {

          });
        }
      );
    });
}());
