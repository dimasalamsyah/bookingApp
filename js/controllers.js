var ctrl = angular.module('starter.controllers', []);

ctrl.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, myCache) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.doLogout = function() {
    /*localStorage.setItem("token_username", "");
    localStorage.setItem("token_password", "");
    localStorage.setItem("token_koneksi", "");*/
    //$state.href("login");


    /*if (cache) { // If there’s something in the cache, use it!
      $scope.variable = cache;
      console.log($scope.variable);
    }
    else { // Otherwise, let’s generate a new instance
      myCache.put('myData', 'This is cached data!');
      $scope.variable = myCache.get('myData');
      console.log($scope.variable);
    }*/


  }


});

ctrl.controller('PlaylistsCtrl', function($scope, myCache, $window) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.tes_aja = function(){
    myCache.put('myData', 'This is cached ooo!');
    var cache = myCache.get('myData');
    console.log($window.localStorage['koneksi']);
  }

});

ctrl.controller('PlaylistCtrl', function($scope, $stateParams) {
});
