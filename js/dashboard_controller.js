ctrl.controller('dashboardCtrl', function($scope, $stateParams, $state, $ionicLoading, $http, $timeout, $window) {
	
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


    var count_kelas = [];
	var kelas = [];
	var hari = [];
	var count_hari = [];
	$scope.show();

	$http.get(link_getData_KelasCount).success(function(response,$timeout){

		for (var a = 0; a < response.length; a++) {			
			kelas.push(response[a].nama_kelas.trim());
			count_kelas.push( response[a].count );
		}
		$scope.hide();
	});
	$http.get(link_getData_HariCount).success(function(response,$timeout){
		for (var a = 0; a < response.length; a++) {	
			hari.push( response[a].hari.trim() );
			count_hari.push( response[a].count );
		}
		//console.log(response)
		$scope.hide();
	});

	$scope.kelass = kelas;
	$scope.data_kelass = count_kelas;

	$scope.haris = hari;
	$scope.data_haris = count_hari;
	//console.log($scope.haris);

	$scope.doRefresh = function() {
		count_kelas = [];
		kelas = [];
		hari = [];
		count_hari = [];

		$http.get(link_getData_KelasCount).success(function(response,$timeout){

			for (var a = 0; a < response.length; a++) {			
				kelas.push(response[a].nama_kelas.trim());
				count_kelas.push( response[a].count );
			}
			$scope.$broadcast('scroll.refreshComplete');
		});

		$http.get(link_getData_HariCount).success(function(response,$timeout){
			for (var a = 0; a < response.length; a++) {	
				hari.push( response[a].hari.trim() );
				count_hari.push( response[a].count );
			}
			$scope.$broadcast('scroll.refreshComplete');

		});


		$scope.kelass = kelas;
		$scope.data_kelass = count_kelas;
		$scope.haris = hari;
		$scope.data_haris = count_hari;
    }

    


});