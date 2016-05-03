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
  .filter('split', function() {
    return function(input, splitChar, splitIndex) {
      if(input == null) {
        return "TBA";
      }
      return input.split(splitChar)[splitIndex];
    }
  })
  .controller('CommentsCtrl', function ($scope, $http, $giantbomb) {
    $scope.text = "";
    $scope.comments = [];
    $scope.query = [];
    $scope.description = "";

    var callback = function(result){
      $scope.query = result.results;
      console.log(result.results);
      $scope.description = $scope.query.description.replace(/<a href="[\/]/g,'<a href="http://www.giantbomb.com/');
      $scope.description = $scope.description.replace(/<img src="[\/]/g,'<img src="http://static.giantbomb.com/');
      return result;
    };

    $giantbomb.gameDetails("30615", callback);

    $scope.formatDescription = function(description){
      return description;
    };

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
