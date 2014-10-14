(function(define) {
  "use strict";

  define([], function() {
    return ['HomeService', HomeController];

    function HomeController(homeService) {
      var vm = this;
      vm.title = "Home Module";
    }

  });


}(define));
