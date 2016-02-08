'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('angularjsBlogApp'));
    // load the BootstrapUI module
    beforeEach(module('ui.bootstrap'));

    var scope, $httpBackend, $controller, createController, jsonData;

    // Initialize the controller and a mock scope
    beforeEach(inject(function (_$httpBackend_, _$controller_, $rootScope) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        scope = $rootScope; 
        jasmine.getJSONFixtures().fixturesPath = 'base/test/json/';
        jsonData = window.getJSONFixture('posts.json'); 
        $httpBackend.whenGET('post/index')
            .respond(200,jsonData);
        createController = function(){  
            return $controller('MainCtrl', { $scope: $rootScope });
        };
    }));
    
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    
    it('should fetch blog data', function () {
        $httpBackend.expectGET('post/index');
        createController();
        $httpBackend.flush(); 
    });
    
    it('should retrieve right data for each post lists', function () {
        createController();
        $httpBackend.flush();
        expect(scope.status).toBe(true); 
        expect(scope.oddPostList.length).toBe(3);  
        expect(scope.evenPostList.length).toBe(2);   
    });
});
