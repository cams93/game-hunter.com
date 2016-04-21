'use strict';
(function(){

class CommentsComponent {
  constructor($http, $scope) {
    this.$http = $http;
    this.$comment = '';
  }

}

angular.module('gameHunterApp')
  .component('comments', {
    templateUrl: 'app/comments/comments.html',
    controller: CommentsComponent
  })
  .controller('CommentsCtrl', function ($scope, $http) {
        $scope.text = "";
        $scope.comments = [];

        $scope.getComment = function(){
          $http.get('/api/comments')
            .success(function(data){
              $scope.comments = data;
            })
            .error(function(){
              console.log('Error!');
            })
        };

        $scope.postComment = function(){
          $http.post('/api/comments', {commentData: $scope.text})
           .success(function(){

           })
           .error(function(){
             console.log('Error');
           });
           $scope.getComment();
           $scope.text = '';
        };

    });
})();
