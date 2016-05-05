'use strict';
(function(){

class CommentsComponent {
  constructor($http, $scope) {
    this.$http = $http;
    this.submitted = false;
  }
}

angular.module('gameHunterApp')
  .component('comments', {
    templateUrl: 'app/comments/comments.html',
    controller: CommentsComponent
  })
  .filter('split', function() {
    return function(input, splitChar, splitIndex) {
      if(input == null) {
        return "TBA";
      }
      return input.split(splitChar)[splitIndex];
    }
  })
  .controller('CommentsCtrl', function ($scope, $http, $giantbomb, $routeParams, $cookies, Auth) {
    $scope.text = "";
    $scope.userName = "";
    $scope.date= "";
    $scope.empty = false;
    $scope.noLogged = false;

    $scope.query = [];
    $scope.description = "";
    var callback = function(result){
      $scope.query = result.results;
      $scope.description = $scope.query.description.replace(/<a href="[\/]/g,'<a href="http://www.giantbomb.com/');
      $scope.description = $scope.description.replace(/<img src="[\/]/g,'<img src="http://static.giantbomb.com/');
      return result;
    };

    $giantbomb.gameDetails($routeParams.comments, callback);

    $scope.formatDescription = function(description){
      return description;
    };

    $scope.getComment = function(){
      $scope.comments = [];
      $http.get('/api/comments/')
        .success(function(data){
          for(var i=0; i<data.length; i++){
            var obj = data[i];
            if(obj.commentId == $routeParams.comments){
              $scope.comments.push(obj);
            }
          }
        })
        .error(function(){
          console.log('Error!');
        });
    };

    $scope.postComment = function(text){
      if($cookies.get('token')){
        $scope.noLogged = false;
        if(text) {
          $scope.empty = false;
          $scope.userName = Auth.getCurrentUser().name;
          $scope.date = new Date().toUTCString();
          var info = {
            commentData: text,
            commentId: $routeParams.comments,
            userName: $scope.userName,
            date: $scope.date
          };
          $http.post('/api/comments/', info);
          $scope.text = null;
          $scope.getComment();
        }
        else{
          $scope.empty = true;
        }
      }
      else{
        $scope.noLogged = true;
      }
    };
  });
})();
