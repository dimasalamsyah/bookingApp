ctrl.controller('chatCtrl', function($scope, $stateParams, $state, $ionicLoading, 
	$http, $timeout, $ionicPopup, $ionicScrollDelegate, Messages, myLogin, $cordovaOauth, $timeout, limitChat) {

	$scope.messages =Messages.all();
	$scope.typing =Messages.allType();

	limitChat.limit = 100;
	$scope.noMoreItemsAvailable = false;
	
	//console.log(Messages.all());
	
	var username = "";
	var to;
	$scope.nama_chatId = $stateParams.ChatId;

	if(myLogin.username=="" || myLogin.username==null){
		$state.go("loginChat");
	}

	$scope.loadMoreChat = function() {
	    /*$scope.items.push({ id: $scope.items.length});
	   
	    if ( $scope.items.length == 99 ) {
	      $scope.noMoreItemsAvailable = true;
	    }*/
	    $scope.$broadcast('scroll.infiniteScrollComplete');
	    console.log("masuk");
	};

	$scope.onChatScroll = ionic.debounce(function(top) {
	    if ($ionicScrollDelegate.getScrollPosition().bottom <= top) {
	      $scope.loadMoreChat();
	    }
	}, 500);
	
	$scope.chat_lists = [
	    { nama: 'dimas', last_index: 'kosong', id: 1 },
	    { nama: 'nisa', last_index: 'kosong', id: 2 }
	];

	var inputChangedPromise;
	$scope.funcKeydown = function() {

		if(inputChangedPromise){
	        $timeout.cancel(inputChangedPromise);
	        //$scope.typing = "Sedang menulis...";
	        Messages.createType({
	        	"nama": $scope.nama_chatId,
		    	"type": "Sedang menulis..."
		    });
	    }
	    inputChangedPromise = $timeout(function(){
	    	//$scope.typing = "";
	    	Messages.removeType();
	    	//console.log("tes"); 
	    },1000);
	}

	

	$scope.login = function(username){
		username = username;
		myLogin.username = username;

		$state.go("app.chat_lists");
		//myLogin.addLogin(username);
	}

	$scope.chat_name = myLogin.username;

	//console.log($scope.messages);
	$scope.send = function(newMessage) {
        
        /*$scope.messages.$add({
	        "nama": myLogin.username,
	        "pesan": newMessage,
	        "waktu": Firebase.ServerValue.TIMESTAMP
	    });*/

	    Messages.create({
	    	"nama": myLogin.username,
	        "pesan": newMessage,
	        "waktu": firebase.database.ServerValue.TIMESTAMP
	    })

	    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
	    $scope.newMessage = "";
    }


    var datanya = $scope.messages;
    $scope.limitnya = 3;
    $scope.loadMore = function() {
      var increamented = $scope.limitnya + 3;
      $scope.limitnya = increamented > datanya.length ? datanya.length : increamented;
    };



    $scope.tesLog = function(){
    	firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});

    }

    $scope.googleLogin = function() {
        $cordovaOauth.google("811336287783-b5jsm2l2peoalibn6k2re4lmsnkiiofa.apps.googleusercontent.com", ["email", "profile"]).then(function(result) {

          $scope.showProfile = false;
	      $http.get("https://www.googleapis.com/plus/v1/people/me", {params: {access_token: result.access_token }})
	      .then(function(res) {

	       $scope.showProfile = true;
	       $scope.details = res.data;
	       console.log("res.data" + res.data);

	      }, function(error) {
	          alert("Error: " + error);
	          console.log("error" + error);
	      });

        }, function(error) {
        	$scope.details = 'got error';
        });

    }

    /*var query = firebase.database().ref("chat").orderByKey();
	query.once("value")
	  .then(function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      //var key = childSnapshot.key; // "ada"
	      key = childSnapshot.child(childSnapshot.key).val();
	      console.log(key);
	      // Cancel enumeration
	      //return true;
	  });
	});*/


	
});

/*ctrl.controller('chat', function($scope, $stateParams, $state, $ionicLoading, 
	$http, $timeout, $ionicPopup, $ionicScrollDelegate, Messages, myLogin, $cordovaOauth, $timeout) {

	$ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
	console.log("AA");

});*/