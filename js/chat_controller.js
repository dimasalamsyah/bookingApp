ctrl.controller('chatCtrl', function($scope, $stateParams, $state, $ionicLoading, 
	$http, $timeout, $ionicPopup, $ionicScrollDelegate, Messages, myLogin, $cordovaOauth, $timeout) {

	$scope.messages =Messages.all();
	//console.log($scope.messages);
	//$scope.tes = Messages.all();
	
	var username = "";
	var to;

	$scope.nama_chatId = $stateParams.ChatId;

	$scope.chat_lists = [
	    { nama: 'dimas', last_index: 'kosong', id: 1 },
	    { nama: 'nisa', last_index: 'kosong', id: 2 }
	];


	$scope.funcKeydown = function() {
	   if(to){

	   	clearTimeout(to); 
	    to = null;

	   }

	   console.log("aaa");
	   Messages.createType({
	    	"type": "typing..."
	    });
	   
	   $scope.stoppedTyping();//setTimeout($scope.stoppedTyping(), 10000);
	   
	}

	$scope.stoppedTyping = function() {
	   to = null;
	   Messages.removeType();
	   
	   setTimeout(console.log("remove aa"), 10000);
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
        console.log("masuk");

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


	
})