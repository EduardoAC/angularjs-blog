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

}).service("httpDataLoader", function($http) {
    this.load = function() {
      return $http({ method: 'GET', url: "test/json/posts.json"});
    };
    this.getPost = function(slug){
      return $http({ method: 'GET', url: "test/json/" + slug + ".json"});
    };
}).directive('post', function () {
    var linker = function ($scope, element, attrs) {
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
}).controller('PostCtrl', function (postResponse,$scope) {
    $scope.post = postResponse.data;
    console.log(postResponse);
});