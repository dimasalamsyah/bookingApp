ctrl.controller('cameraCtrl', function($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {

	/*ini udah bisa*/
	$scope.imgURI="";
	$scope.takePicture = function() {
		document.addEventListener("deviceready", function () {
		    var options = { 
		        quality : 100, 
		        destinationType : Camera.DestinationType.DATA_URL, 
		        sourceType : Camera.PictureSourceType.CAMERA, 
		        allowEdit : true,
		        encodingType: Camera.EncodingType.PNG,
		        targetWidth: 350,
		        targetHeight: 350,
		        popoverOptions: CameraPopoverOptions,
		        saveToPhotoAlbum: false
		    };

		    $cordovaCamera.getPicture(options).then(function(imageData) {
		        $scope.imgURI = "data:image/jpeg;base64," + imageData;
		    }, function(err) {
		        // An error occured. Show a message to the user
		    });
		}, false);
	}

	$scope.upload = function() {

		document.addEventListener('deviceready', function () {
			// Destination URL 
		     var url = "http://192.168.43.242/ionic/bookingApp/www/ionic_server/upload.php";
		      
		     //File for Upload
		     var targetPath = cordova.file.externalRootDirectory + $scope.imgURI;
		     
		     $ionicPopup.alert({
			     title: 'Pesan result' + $scope.imgURI,
			     template: targetPath
			   });

		     // File name only
		     var filename = targetPath.split("/").pop();
		      
		     var options = {
		          fileKey: "file",
		          fileName: filename,
		          chunkedMode: false,
		          mimeType: "image/jpg",
		          params : {'directory':'upload', 'fileName':filename}
		      };
		           
		      $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
		          console.log("SUCCESS: " + JSON.stringify(result.response));
		          $ionicPopup.alert({
				     title: 'Pesan result',
				     template: result
				   });

		      }, function (err) {
		          console.log("ERROR: " + JSON.stringify(err));
			       $ionicPopup.alert({
				     title: 'Pesan err',
				     template: err
				   });
		      }, function (progress) {
		          // PROGRESS HANDLING GOES HERE
		      });

	   }, false);


    }

    $scope.testFileDownload = function () {
 		
 		document.addEventListener("deviceready", function () {

 			// File for download
		      var url = "http://www.gajotres.net/wp-content/uploads/2015/04/logo_radni.png";
		       
		      // File name only
		      var filename = url.split("/").pop();
		       
		      // Save location
		      var targetPath = cordova.file.externalRootDirectory + filename;
		 
		      $cordovaFileTransfer.download(url, targetPath, {}, true).then(function (result) {
		          console.log('Success');
		          $ionicPopup.alert({
					     title: 'Pesan result',
					     template: result
					   });
		      }, function (error) {
		          console.log('Error');
		          $ionicPopup.alert({
					     title: 'Pesan Error',
					     template: error
					   });
		      }, function (progress) {
		          // PROGRESS HANDLING GOES HERE
		      });

 		});
      


  	}

  	$scope.browseFoto = function() {

  		$cordovaCamera.getPicture(options).then(function(imageData) {

            //console.log(imageData);
            //console.log(options);   
            var image = document.getElementById('tempImage');
            image.src = imageData;  

            var server = "http://yourdomain.com/upload.php",
                filePath = imageData;

            var date = new Date();

            var options = {
                fileKey: "file",
                fileName: imageData.substr(imageData.lastIndexOf('/') + 1),
                chunkedMode: false,
                mimeType: "image/jpg"
            };

            $cordovaFileTransfer.upload(server, filePath, options).then(function(result) {
                console.log("SUCCESS: " + JSON.stringify(result.response));
                console.log('Result_' + result.response[0] + '_ending');
                alert("success");
                alert(JSON.stringify(result.response));

            }, function(err) {
                console.log("ERROR: " + JSON.stringify(err));
                //alert(JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
            });


        }, function(err) {
            // error
            console.log(err);
        });


  	}
   


});