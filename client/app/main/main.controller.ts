'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchGame   = '';     // set the default search/filter term

    $scope.games =

      [{
        "Image": "resources/hardline.jpg",
        "Name": "Call of Duty: Hardline",
        "Date": "June, 2015",
        "Developer": "Visceral Games",
        "Distributor": "Electronic Arts",
        "Genres": "First Person Shooter, Action",
        "Platform": "PC, Play Station 3, PlayStation 4, Xbox One"
      }, {
        "Image": "/resources/syndicate.jpg",
        "Name": "Assassin's Creed: Syndicate",
        "Date": "Octuber, 2015",
        "Developer": "Ubisoft",
        "Distributor": "Ubisoft",
        "Genres": "Action, Adventure",
        "Platform": "PC, Play Station 4, Xbox One"
      }, {
        "Image": "resources/goat.jpg",
        "Name": "Goat Simulator",
        "Date": "April, 2014",
        "Developer": "Coffee Stain Studios",
        "Distributor": "Koch Media",
        "Genres": "Action",
        "Platform": "PC, Linux, OS X, Xbox One, Xbox 360, Play Station 3, Play Station 4"
      }, {
        "Image": "/resources/smash.jpg",
        "Name": "Super Smash Bros 4",
        "Date": "October, 2014",
        "Developer": "Sora Ltd, Bandai Namco Games",
        "Distributor": "Nintendo",
        "Genres": "Fighting",
        "Platform": "Nintendo 3DS, Wii U"
      }, {
        "Image": "/resources/rocket.jpg",
        "Name": "Rocket League",
        "Date": "July, 2015",
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

angular.module('gameHunterComApp')
  .controller('MainController', MainController);

})();
