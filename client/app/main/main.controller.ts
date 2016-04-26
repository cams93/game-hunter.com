'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, $giantbomb) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.sortType     = 'name';
    $scope.sortReverse  = false;
    $scope.searchGame   = '';
    $scope.progressBar = false;

    $scope.query = [];
    $scope.console = [];
    $scope.consoleFrec = {};
    $scope.filters = {c: 'all'};
    $scope.selected = 'All Platforms';

    $scope.select= function(item) {
      $scope.selected = item;
    };

    $scope.isActive = function(item) {
      return $scope.selected === item;
    };

    var callback = function(result){
      $scope.query = result.results;
      $scope.console.length = 0;
      $scope.sortType     = 'name';
      $scope.sortReverse  = false;
      $scope.searchGame   = '';
      $scope.consoleFrec = {};
      $scope.filters.c = 'all';
      $scope.selected = 'All Platforms';
      $scope.getConsoles();
      return result;
    };

    $giantbomb.gameSearch("gears of war", callback);

    $scope.search = function(searchString){
      $giantbomb.gameSearch(searchString, callback);
      $scope.progressBar = false;
    };

    $scope.consoles = function(con){
      if($scope.console.indexOf(con) == -1){
        $scope.console.push(con);
        $scope.progressBar = true;
      }
    };
    $scope.formatName = function(name){
      var count = 0;
      var str="";
      for(var i = 0; i < name.length; i++) {
        str=str+name.charAt(i);
        count++;
        if (count >= 18) {
          i++;
          while(name.charAt(i)!= ' ' && i < name.length){
            str=str+name.charAt(i);
            i++;
          }
          str=str+" <br /> ";
          count=0;
        }
      }
        return str;
    };
    $scope.getConsoles = function (){
      for(var j = 0; j <$scope.query.length; j++) {
        var platforms = $scope.query[j].platforms;
        if(platforms != null){
          for (var i = 0; i < platforms.length; i++) {
            if ($scope.consoleFrec[platforms[i].name] == null) {
              $scope.consoleFrec[platforms[i].name] = 1
            }
            else {
              $scope.consoleFrec[platforms[i].name]++;
            }
          }
        }
      }
    };

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
  .constant('_api','c73ada009a6a9bd847ff325e3344c3dde52ed181')
  .factory('$giantbomb', ['$resource','_api', function($resource, _api) {
    var GiantBomb = {
      _apiKey : _api,
      setAPIKey : function(apiKey){
        this._apiKey = apiKey;
      },

      gameDetails : function(gameId, callback){
        $resource('//www.giantbomb.com/:action/:id',
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
        $resource('//www.giantbomb.com/:action',
          {
            action: 'api/games',
            field_list: 'name,image,id,platforms,original_release_date,date_last_updated,number_of_user_reviews',
            filter: 'name:' + searchString,
            limit: '99',
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
        return "TBA";
      }
      return input.split(splitChar)[splitIndex];
    }
  })
  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter, {'event': event});
          });

          event.preventDefault();
        }
      });
    };
  })
  .directive('errSrc', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          if (attrs.src != attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
      }
    }
  })
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();



