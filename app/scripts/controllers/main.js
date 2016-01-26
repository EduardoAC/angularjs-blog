'use strict';

/**
 * @ngdoc function
 * @name angularjsBlogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsBlogApp
 */
angular.module('angularjsBlogApp')
.controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma',
        'SitePoint'
    ];
    $scope.date = new Date();
    $scope.url = 'test/posts.json';
    $scope.content = [];

    $scope.fetchContent = function() {
        $http.get($scope.url).then(function(result){
            var even = false;
            var oddPostList = [];
            var evenPostList = [];
            angular.forEach(result.data, function(val,ky){
                if(even){
                    evenPostList.push(val);
                }else{
                    oddPostList.push(val);
                }
                even = !even;
            });
            console.log(oddPostList);
            $scope.oddPostList = oddPostList;
            $scope.evenPostList = evenPostList;
        });
    };

    $scope.fetchContent();
}).directive('post', function () {
    var linker = function ($scope, element, attrs) {
        element.addClass("post");
        console.log($scope);
//        if(typeof $scope.postInfo === "undefined"){
//            $scope.postInfo ={
//                image: {
//                    url: "http://eduardo-aparicio-cardenes.website/images/frontend/frameworks-libraries-plugins.jpg",
//                    alt: "Standard Post with Image"
//                },
//                title: "Post title"
//            }
//        }
        $scope.postInfo = $scope.$parent.postInfo;
    };

    return {
        restrict: 'E',
        scope: {
            postInfo: '='
        },
        link: linker,
        templateUrl: 'templates/blog-post.html'
    };
});
