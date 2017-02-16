ctrl.controller('bookingCtrl', function($scope, $stateParams, $state, ionicDatePicker, $ionicLoading, $http, $sce, $window, $timeout) {

	$scope.koneksiData = {};
	var ip="";
    $scope.create_koneksi = function(){
    	console.log($scope.koneksiData.ip);
    	ip = $scope.koneksiData.ip;
    	link = "http://"+ ip;

		link_getData_Barang = "http://"+ link +"/ionic/ionic_server/getData_barang.php";
		link_getData_Kelas = "http://"+ link +"/ionic/ionic_server/getData_kelas.php";
		link_getData_Jam = "http://"+ link +"/ionic/ionic_server/getData_jam.php";
		link_getData_ListPemesanan = "http://"+ link +"/ionic/ionic_server/getData_ListPemesanan1.php";

		link_setData_Pemesanan = "http://"+ link +"/ionic/ionic_server/cekData_Pemesanan.php";

		link_delData_Pemesanan = "http://"+ link +"/ionic/ionic_server/delData_Pemesanan.php";

		$scope.show();
		$http.get(link).success(function(data){

		}).finally(function() {
			$scope.hide();	
	       console.log("finally");
	       $state.go("app.booking");
	    });

	    $timeout(function() {
	    	$scope.resultKoneksi = "Koneksi gagal!";
	        $scope.hide();
	    }, 10000);

    }

	$scope.kelass = [
	    { title: '201',   class:'col-50', href:'booking/201', id: 1 },
	    { title: '202',   class:'col-50', href:'booking/202', id: 2 },
	    { title: '203',   class:'col-50', href:'booking/203', id: 3 },
	    { title: '205',   class:'col-50', href:'booking/205', ids: 4 },
	    { title: 'LAB A', class:'col-50', href:'booking/LAB A', id: 5 },
	    { title: 'LAB B', class:'col-50', href:'booking/LAB B', id: 6 }
	  ];

	$scope.jams = [
	    { title: '08.00 - 09.00', id: 1 },
	    { title: '09.00 - 10.00', id: 2 },
	    { title: '11.00 - 12.00', id: 3 },
	    { title: '12.00 - 13.00', id: 4 },
	    { title: '13.00 - 14.00', id: 5 },
	    { title: '14.00 - 15.00', id: 6 }
	  ];

	  $scope.repeat1 = [
	  	{tanggal: '2017-01-02'},
	  	{tanggal: '2017-01-02'},
	  	{tanggal: '2017-01-02'}
	  ];



	/*get data list pemesanan*/
	$http.get(link_getData_ListPemesanan).success(function(data){
		//$scope.lists = $sce.trustAsHtml(data);
		$scope.lists = data;
		console.log("ini ip" + ip);
	});

    $scope.doRefresh = function() {
    	$http.get(link_getData_ListPemesanan).success(function(data){
			$scope.lists = data;
		}).finally(function() {
	       // Stop the ion-refresher from spinning
	       $scope.$broadcast('scroll.refreshComplete');
	    });
    }


	 /*get current page*/
	$scope.getKelas = $stateParams.bookingId;

	/*tgl*/
	var thn = new Date().getFullYear() - 1; var bln = 1; var tgl = 1;
	var thn_ = thn + 4
	var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: true,
      disableWeekdays: [0]
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
    /*akhir tgl*/

    /*tgl ozen*/
    var date= new Date();
    var highlights = [
	    {
	        date: new Date(2017, 2, 7),
	        color: 'red',
	        textColor: '#fff'
	    },
	    {
	        date: new Date(2017, 2, 18)
	    },
	    {
	        date: new Date(2016, 1, 19)
	    },
	    {
	        date: new Date(2016, 1, 20)
	    }
	];

	var months = new Array();
	months[0] = "01"; //January
	months[1] = "02"; //February
	months[2] = "03"; //March
	months[3] = "04"; //April
	months[4] = "05"; //May
	months[5] = "06"; //June
	months[6] = "07"; //July
	months[7] = "08"; //August
	months[8] = "09"; //September
	months[9] = "10"; //October
	months[10] = "11"; //November
	months[11] = "12"; //December

	var weekday = new Array();
	weekday[0] =  "Senin";
	weekday[1] = "Selesa";
	weekday[2] = "Rabu";
	weekday[3] = "Kamis";
	weekday[4] = "jumat";
	weekday[5] = "Sabtu";
	weekday[6] = "Minggu";

	 var getTgl = date.getFullYear() +"-"+ months[date.getMonth()] +"-"+ date.getDate();
	 var getJam = "";
    $scope.onezoneDatepicker = {
	    date: date, // MANDATORY                     
	    mondayFirst: false,                
	    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],                    
	    daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],     
	    startDate: new Date(thn, bln, tgl),             
	    endDate: new Date(thn_, bln, tgl),                    
	    disablePastDays: false,
	    disableSwipe: false,
	    disableWeekend: false,
	    disableDates: false,
	    disableDaysOfWeek: false,
	    showDatepicker: false,
	    showTodayButton: true,
	    calendarMode: false,
	    hideCancelButton: false,
	    hideSetButton: false,
	    highlights: highlights,
	    callback: function(value){
	        // your code
	        getTgl = new Date(value).getFullYear() +"-"+ months[value.getMonth()] +"-"+ new Date(value).getDate();
	        //console.log();
	    }
	};
	 /*akhir tgl ozen*/
	$scope.isiJam = '08.00 - 09.00'; //biar gag kosong comboboxnya
	getJam = $scope.isiJam;
	$scope.selectJam = function(isiJam) {
	    getJam = isiJam;
	    //console.log(isiJam);
	}

	$scope.btn_klik = "null";
	$scope.check_booking = function(){
		$scope.show();
		//$scope.btn_klik = "klik_btn";

		$http.post(link_setData_Pemesanan, {
			setKelas : $scope.getKelas,
			setTgl : getTgl,
			setJam : getJam
		})
		.success(function(response,$timeout){
			$scope.hide();
			if(response.trim() == "success"){
				$scope.cek_result = "success";
			}else{
				$scope.cek_result = "failed";
			}
			console.log(response);
		});

		//console.log($scope.getKelas+" "+ getTgl +" "+ getJam);
    };

    /*hapus booking*/
    $scope.del_booking = function(id_kelas, id_jam, tanggal) {
	    console.log(id_kelas.trim() + id_jam.trim() + tanggal.trim());
	    $scope.show();

	    $http.post(link_delData_Pemesanan, {
			setKelas : id_kelas.trim(),
			setTgl : tanggal.trim(),
			setJam : id_jam.trim()
		})
		.success(function(response,$timeout){
			$scope.hide();		
		});
	}

	$scope.refresh_page = function() {
		$window.location.reload(true);
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