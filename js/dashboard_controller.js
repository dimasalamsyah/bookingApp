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
	$scope.show();

    /*get data list pemesanan*/
	$http.get(link_getData_Kelas).success(function(data){
		//console.log($scope.kelass2 = data);
		for(var i in data) {
			kelas.push(data[i].nama_kelas.trim());

			$http.post(link_getData_KelasCount, {
				kelas_id : data[i].nama_kelas.trim()
			})
			.success(function(response,$timeout){
				//console.log( "nama kelas:" + data[i].nama_kelas.trim() +" count:"+ response.trim())
				//console.log(response.count);
				console.log(response);
				count_kelas.push(response.count.trim());
			});

			//console.log(data[i].nama_kelas.trim());
		}
		$scope.hide();
		$scope.kelass = kelas;
		$scope.data_kelass = count_kelas;

	});


	$scope.doRefresh = function() {
		count_kelas = [];
		kelas = [];

    	$http.get(link_getData_Kelas).success(function(data){
    		//console.log(data);
    		for(var i in data) {
				kelas.push(data[i].nama_kelas.trim());

				$http.post(link_getData_KelasCount, {
					kelas_id : data[i].nama_kelas.trim()
				})
				.success(function(response,$timeout){
					count_kelas.push(response.trim());
					console.log( "nama kelas:" + data[i].nama_kelas.trim() +" "+ response.trim())
				});
			}
			$scope.kelass = kelas;
			$scope.data_kelass = count_kelas;

		}).finally(function() {
			//console.log("data");
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	    });
    }

    


});