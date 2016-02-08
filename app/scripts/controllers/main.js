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
    $scope.date = new Date();
    $scope.url = 'post/index';
    $scope.status = false;
    $scope.fetchContent = function() {
        $http({ method: 'GET', url: $scope.url }).then(function(result){
            $scope.status = true;
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
            $scope.oddPostList = oddPostList;
            $scope.evenPostList = evenPostList;
        }, function(response){
            $scope.status = false;
        });
    };

    $scope.fetchContent();
}).directive('post', function () {
    var linker = function ($scope, element, attrs) {
        element.addClass("post");
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
