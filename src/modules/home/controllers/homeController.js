(function (define) {
    "use strict";

    define([], function () {
        return ['HomeService', HomeController];

        function HomeController(homeService) {
            var vm = this;
            vm.title = "Home Module";

            vm.dataFromService = homeService.getData();

            vm.sum = _sum;



            function _sum(a, b) {
                return a + b;
            }
        }

    });


}(define));
