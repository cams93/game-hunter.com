'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];

    $scope.sortType     = 'Name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchGame   = '';     // set the default search/filter term

    $scope.genres = ["Action", "Shooter", "Action-adventure", "Adventure", "Role-playing", "Simulation", "Sports", "Strategy", "Survival horror", "Massively multiplayer online"];
    $scope.developers = ["Visceral Games", "Ubisoft", "Coffee Stain Studios", "Sora Ltd, Bandai Namco Games", "Psyonix"];
    $scope.distributors = ["Electronic Arts", "Ubisoft", "Koch Media", "Nintendo", "Psyonix"];

    $scope.games =
      [{
        "Image": "assets/images/hardline.jpg",
        "Name": "Call of Duty: Hardline",
        "Date": "2015-06-01",
        "Developer": "Visceral Games",
        "Distributor": "Electronic Arts",
        "Genres": "First Person Shooter, Action",
        "Platform": "PC, Play Station 3, PlayStation 4, Xbox One"
      }, {
        "Image": "assets/images/syndicate.jpg",
        "Name": "Assassin's Creed: Syndicate",
        "Date": "2015-10-01",
        "Developer": "Ubisoft",
        "Distributor": "Ubisoft",
        "Genres": "Action, Adventure",
        "Platform": "PC, Play Station 4, Xbox One"
      }, {
        "Image": "assets/images/goat.jpg",
        "Name": "Goat Simulator",
        "Date": "2014-04-01",
        "Developer": "Coffee Stain Studios",
        "Distributor": "Koch Media",
        "Genres": "Action",
        "Platform": "PC, Linux, OS X, Xbox One, Xbox 360, Play Station 3, Play Station 4"
      }, {
        "Image": "assets/images/smash.jpg",
        "Name": "Super Smash Bros 4",
        "Date": "2014-10-01",
        "Developer": "Sora Ltd, Bandai Namco Games",
        "Distributor": "Nintendo",
        "Genres": "Fighting",
        "Platform": "Nintendo 3DS, Wii U"
      }, {
        "Image": "assets/images/rocket.jpg",
        "Name": "Rocket League",
        "Date": "2015-07-01",
        "Developer": "Psyonix",
        "Distributor": "Psyonix",
        "Genres": "Sports",
        "Platform": "PC, OS X, Linux, Play Station 4, Xbox One"
      }];

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
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
