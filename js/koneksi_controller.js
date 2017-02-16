ctrl.controller('koneksiCtrl', function($scope, $stateParams, $state, $ionicLoading, $http, $timeout) {

	$scope.koneksiData = {};
	$scope.create_koneksi = function(){
		ip = "http://" + $scope.koneksiData.ip;
		$scope.token_koneksi = ip.trim();
		localStorage.setItem("token_koneksi", $scope.token_koneksi);

		$scope.show();
			
			link_connected = ip + link_dir;
		    $http({
			  method: 'GET',
			  url: link_connected,
			  timeout: 5000
			}).then(function successCallback(response) {
				//$scope.resultKoneksi = "Connected";
				//console.log(response);
				//console.log(link_connected);
			    $scope.hide();
			    $state.go("app.booking");
			  }, function errorCallback(response) {
			  	$scope.resultKoneksi = "Not Connected";
			    //console.log(response);
			    //console.log(link_connected);
			    $scope.hide();
			});

	};

	/*loading*/
	$scope.show = function() {
		$ionicLoading.show({
		    content: 'Loading',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 0,
		    //duration: 5000
		}).then(function(){

	    });
	 };
	$scope.hide = function(){
	    $ionicLoading.hide().then(function(){

	  	});
	};

});