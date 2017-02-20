ctrl.controller('chatCtrl', function($scope, $stateParams, $state, $ionicLoading, $http, $timeout, $ionicPopup, $ionicScrollDelegate, Messages, myLogin) {

	$scope.messages = Messages.all();
	var username = "";
	
	$scope.nama_chatId = $stateParams.ChatId;

	$scope.chat_lists = [
	    { nama: 'dimas', last_index: 'kosong', id: 1 },
	    { nama: 'nisa', last_index: 'kosong', id: 2 }
	];


	$scope.login = function(username){
		username = username;
		myLogin.username = username;

		$state.go("app.chat_lists");
		//myLogin.addLogin(username);
	}

	$scope.chat_name = myLogin.username;

	//console.log($scope.messages);
	$scope.send = function(newMessage) {
        
        $scope.messages.$add({
	        "nama": myLogin.username,
	        "pesan": newMessage,
	        "waktu": Firebase.ServerValue.TIMESTAMP
	    });
	    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
	    $scope.newMessage = "";
		//console.log(myLogin.username);
    }


})