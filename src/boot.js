(function() {
  "use strict";

  $script(
    [
      //inject:vendors-files
      //end-inject:vendros-files
    ],
    function() {
      $script(
        [
          //inject:app-files
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
