'use strict';

/**
 * @ngdoc function
 * @name angularjsBlogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsBlogApp
 */
angular.module('angularjsBlogApp')
.controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma',
        'SitePoint'
    ];
    $scope.date = new Date();
}).directive('post', function () {
    return {
        restrict: 'E',
        scope: {
            postInfo: '='
        },
        link: function ($scope, element, attrs) {
            element.addClass("post");
        },
        templateUrl: 'templates/blog-post.html'
    };
});
