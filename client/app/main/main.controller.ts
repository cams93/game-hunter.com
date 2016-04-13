'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $resource, $giantbomb) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.sortType     = 'Name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchGame   = '';     // set the default search/filter term


    $scope.query = [];
    $scope.genres = [];
    var callback = function(result){
      $scope.query = result.results;
      console.log($scope.query);
      return result;
    };

    function getG(result) {
      $scope.genres = result.results.genres;
      //console.log($scope.query);
      return result;
    }

    $scope.getGenres = function(gameId){
      //$giantbomb.gameDetails(gameId,getG);
      return $scope.genres;
    };

    $giantbomb.gameSearch("gears of war",callback);

    $scope.genres = ["Action", "Shooter", "Action-adventure", "Adventure", "Role-playing", "Simulation", "Sports", "Strategy", "Survival horror", "Massively multiplayer online"];
    $scope.developers = ["Visceral Games", "Ubisoft", "Coffee Stain Studios", "Sora Ltd, Bandai Namco Games", "Psyonix"];
    $scope.distributors = ["Electronic Arts", "Ubisoft", "Koch Media", "Nintendo", "Psyonix"];

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('gameHunterApp')
  .factory('$giantbomb', ['$resource', function($resource) {
    var GiantBomb = {

      _apiKey : 'c73ada009a6a9bd847ff325e3344c3dde52ed181',

      setAPIKey : function(apiKey){
        console.log("Setting Api Key", apiKey);
        this._apiKey = apiKey;
      },

      gameDetails : function(gameId, callback){
        $resource('http://www.giantbomb.com/:action/:id',
          {
            action: 'api/game',
            id: gameId,
            field_list: 'name,description,id,original_release_date,platforms,api_detail_url,site_detail_url',
            api_key: this._apiKey,
            format: 'jsonp',
            json_callback: 'JSON_CALLBACK'
          },
          {
            get: {method: 'JSONP'}
          }).get({}, function(result){
          callback(result);
        });
      },

      gameSearch : function(searchString, callback){
        $resource('http://www.giantbomb.com/:action',
          {
            action: 'api/games',
            field_list: 'name,image,id,platforms,original_release_date,date_last_updated,number_of_user_reviews',
            filter: 'name:' + searchString,
            api_key: this._apiKey,
            format: 'jsonp',
            json_callback: 'JSON_CALLBACK'
          },
          {
            get: {method: 'JSONP'}
          }).get({}, function(result){
          callback(result);
        });
      }
    };
    return GiantBomb;
  }])
  .filter('split', function() {
    return function(input, splitChar, splitIndex) {
      if(input == null) {
        return "Not available";
      }
      return input.split(splitChar)[splitIndex];
    }
  })
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();



