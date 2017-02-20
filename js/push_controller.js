ctrl.controller('pushCtrl', function($scope, $stateParams, $state, $ionicLoading, $http, $timeout,  $ionicPush) {


	$ionicPush.register().then(function(t) {
	  return $ionicPush.saveToken(t);
	}).then(function(t) {
	  console.log('Token saved:', t.token);
	});

	$scope.$on('cloud:push:notification', function(event, data) {
	  var msg = data.message;
	  alert(msg.title + ': ' + msg.text);
	});

})