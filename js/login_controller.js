ctrl.controller('loginCtrl', function($scope, $stateParams, $state, $ionicLoading, $http, $timeout, $window) {

	$scope.loginData = {};
	var link_connected="";
	var username = $scope.loginData.username;
	var password = $scope.loginData.password;
	var koneksi  = $scope.loginData.koneksi;

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

	$window.localStorage['koneksi'] = "tes";


	$scope.loginApp = function(){

		/*ip = "http://" + $scope.loginData.koneksi;
		$scope.token_koneksi = ip.trim();
		//localStorage.setItem("token_koneksi", $scope.token_koneksi);
		link_connected = ip + link_dir;

		$scope.show();
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
		    $scope.pesan_login = "Connected";

		    localStorage.setItem("token_username", $scope.username);
		    localStorage.setItem("token_password", $scope.password);
		    localStorage.setItem("token_koneksi", $scope.koneksi);

		  }, function errorCallback(response) {
		  	$scope.pesan_login = "Not Connected";
		    //console.log(response);
		    //console.log(link_connected);
		    $scope.hide();
		});*/

		console.log($window.localStorage['koneksi']);

	};

});