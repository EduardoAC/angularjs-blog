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

}).controller('PostCtrl', function ($scope, $routeParams, httpDataLoader, commentsService) {
    httpDataLoader.getPost($routeParams.slug).then(function(response){
        $scope.post = response.data;
    });
    $scope.authorBio = {
        name: "eduardo aparicio cardenes",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
        imgUrl: "http://eduardo-aparicio-cardenes.website/images/eduardo-aparicio-cardenes-graduation.jpg"
    };
    $scope.comments = [];
    
    $scope.submitComment = function () {
        var submitDate = new Date();
        $scope.c.alert = false;

        var data = {
            'author': $scope.c.author,
            'comment': $scope.c.comment,
            'datePublished': submitDate.getFullYear() + '-' + (submitDate.getMonth() + 1) + '-' + submitDate.getDate() + ' ' + submitDate.getHours() + ':' + submitDate.getMinutes() + ':' + submitDate.getSeconds(),
            'email': $scope.c.email,
            'languageId': 1,
            'News-Comments': '+structureName:News +identifier:' + $scope.postId,
            'stName': 'Comments',
            'title': 'Comment re: ' + $scope.postTitle
        };

        commentsService.postComment(data)
        .then(function () {
            $scope.commentsForm.$setPristine();
            $scope.c = {};
        }, function () {
            $scope.c.alert = true;
        });
    };
    
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
}).directive('comments', function(){
    var linker = function ($scope, element) {
        element.addClass("comments");
        $scope.comments = $scope.$parent.comments;
        $scope.showModal = false;
        $scope.toggleModal = function(){
            $scope.showModal = !$scope.showModal;
        };
    };

    return {
        restrict: 'E',
        scope: {
            comments: '=',
            postId: '=',
            postTitle: '='
        },
        link: linker,
        templateUrl: 'templates/comments.html'
    };
}).service("commentsService", function($http) {
    this.getComments = function(id) {
      return $http({ method: 'GET', url: "test/json/comments.json", data: {id: id}});
    };
    this.postComment = function(data){
      return $http({ method: 'POST', url: "/api/comment/", data: data});
    };
}).directive('commentForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/comments-form.html',
      controller: 'PostCtrl',
      controllerAs: 'postCtrl'
    };
}).directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value === true){
            $(element).modal('show');
              
          }else{
            $(element).modal('hide');
          }
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });