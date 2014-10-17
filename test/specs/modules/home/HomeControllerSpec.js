describe("Tests for `Home Controller`", function () {

    var controller,
        controllerFactory,
        homeService;


    beforeEach(function () {
        module('app.Name', function ($provide) {
        });

    });


    beforeEach(inject(function ($injector, $controller) {
        homeService = $injector.get('HomeService');

        spyOn(homeService, 'getData').and.callFake(function () {
            return 'mock data';
        });

        controllerFactory = $controller;
        controller = controllerFactory('HomeController', {HomeService: homeService});
    }));


    it("Home Controller should be defined", function () {
        expect(controller).toBeDefined();
    });

    it("Home Controller should has defined title", function () {
        expect(controller.title).toBeDefined();
    });

    it("Home Controller should be defined sum function", function () {
        expect(controller.sum).toBeDefined();
    });

    it("Home Controller sum function return result from two params ", function () {
        var result = controller.sum(1, 2);
        expect(result).toBe(3);
    });

    it("Home Controller has data from HomeService", function () {
        expect(controller.dataFromService).toBe('mock data');
    });
});
