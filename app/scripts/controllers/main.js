'use strict';

/**
 * @ngdoc function
 * @name angularjsBlogApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsBlogApp
 */
angular.module('angularjsBlogApp')
.controller('MainCtrl', function ($scope, httpDataLoader) {
    $scope.date = new Date();
    $scope.url = 'post/index';
    $scope.status = false;
    
    httpDataLoader.load().then(function(result){
        $scope.status = true;
        var even = false;
        var oddPostList = [];
        var evenPostList = [];
        angular.forEach(result.data, function(val, ky){
            if(even){
                evenPostList.push(val);
            }else{
                oddPostList.push(val);
            }
            even = !even;
        });
        $scope.oddPostList = oddPostList;
        $scope.evenPostList = evenPostList;
    }, function(){
        $scope.status = false;
    });

}).controller('PostCtrl', function (postResponse,$scope) {
    $scope.post = postResponse.data;
    $scope.authorBio = {
        name: "eduardo aparicio cardenes",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        imgUrl: "http://eduardo-aparicio-cardenes.website/images/eduardo-aparicio-cardenes-graduation.jpg"
    };
    console.log(postResponse);
}).service("httpDataLoader", function($http) {
    this.load = function() {
      return $http({ method: 'GET', url: "test/json/posts.json"});
    };
    this.getPost = function(slug){
      return $http({ method: 'GET', url: "test/json/" + slug + ".json"});
    };
}).directive('post', function () {
    var linker = function ($scope, element) {
        element.addClass("post");
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
}).directive('authorBio', function(){
    var linker = function ($scope, element) {
        element.addClass("author-bio");
        $scope.authorBio = $scope.$parent.authorBio;
    };

    return {
        restrict: 'E',
        scope: {
            authorBio: '='
        },
        link: linker,
        templateUrl: 'templates/author-bio.html'
    };
});