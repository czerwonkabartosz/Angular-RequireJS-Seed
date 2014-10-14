(function(define) {
  'use strict';

  define([], function() {
    return ['$http', HomeService];

    function HomeService($http) {

      return {
        getData: _getData
      };

      function _getData() {
        return "data";
      }

    }
  });
}(define));
