'use strict';

describe('Component: CommentsComponent', function () {

  // load the controller's module
  beforeEach(module('gameHunterApp'));

  var CommentsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CommentsComponent = $componentController('CommentsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
