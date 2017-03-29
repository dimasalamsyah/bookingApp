// Ionic Starter App
var link_dir ="/ionic/bookingApp/www/ionic_server/";

//var link = localStorage.getItem("token_koneksi") + link_dir;

var link = "http://localhost:8080" + link_dir;

var link_getData_Kelas = link + "getData_kelas.php";
var link_getData_Jam = link + "getData_jam.php";
var link_getData_ListPemesanan = link + "getData_ListPemesanan1.php";
var link_getData_KelasCount = link + "getData_KelasCount.php";
var link_getData_HariCount = link + "getData_HariCount.php";

var link_setData_Pemesanan = link + "cekData_Pemesanan.php";

var link_delData_Pemesanan = link + "delData_Pemesanan.php";

var firebaseUrl = "https://bookingapp-f3c5d.firebaseio.com/chat";
var firebaseUrl_typing = "https://bookingapp-f3c5d.firebaseio.com/typing";

//var link_setData_Pemesanan = link +"/ionic_server/setData_pemesanan.php";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-datepicker', 'onezone-datepicker', 'chart.js', 
                            'ngCordova', 'firebase', 'angularMoment', 'ngCordovaOauth'])//, 'ionic.cloud'

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

/*login dan set koneksi*/
  .state('loginTes', {
      url: '/loginTes',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
  })
  
  .state('koneksi', {
      url: '/koneksi',
      templateUrl: 'templates/koneksi.html',
      controller: 'koneksiCtrl'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      }
    }
  })
  
/*  .state('loginChat', {
    url: '/loginChat',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'chatCtrl'
      }
    }
  })*/
  .state('loginChat', {
    url: '/loginChat',
    templateUrl: 'templates/login.html',
    controller: 'chatCtrl'
  })


  .state('app.logingoogle', {
    url: '/logingoogle',
    views: {
      'menuContent': {
        templateUrl: 'templates/logingoogle.html',
        controller: 'chatCtrl'
      }
    }
  })

  .state('app.chat_lists', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat_lists.html',
        controller: 'chatCtrl'
      }
    }
  })

  .state('app.chat', {
    url: '/chat/:ChatId',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat_detail.html',
        controller: 'chatCtrl'
      }
    }
  })

  .state('app.camera', {
    url: '/camera',
    views: {
      'menuContent': {
        templateUrl: 'templates/camera.html',
        controller: 'cameraCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

/*booking*/
  .state('app.booking', {
    url: '/booking',
    views: {
      'menuContent': {
        templateUrl: 'templates/booking.html',
        controller: 'bookingCtrl',

      }
    }
  })

  .state('app.booking_detail', {
    url: '/booking/:bookingId',
    views: {
      'menuContent': {
        templateUrl: 'templates/booking_detail.html',
        controller: 'bookingCtrl'
      }
    }
  })
/*akhir booking*/

/*daftar booking*/
  .state('app.list', {
    url: '/list',
    views: {
      'menuContent': {
        templateUrl: 'templates/booking_list.html',
        controller: 'bookingCtrl'
      }
    }
  })
/*akhir booking*/
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loginChat');
})

/*tgl*/
.config(function (ionicDatePickerProvider) {
  var thn = new Date().getFullYear(); var bln = 1; var tgl = 1;
  var thn_ = thn + 4

    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(thn, bln, tgl),
      to: new Date(thn_, bln, tgl),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      //disableWeekdays: [0],
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
/*akhir tgl*/



/*.factory('Messages', function($firebase) {
  var ref = new Firebase("https://bookingapp-f3c5d.firebaseio.com");
  var messages = $firebase(ref.child('chat')).$asArray();
  
  var Message = {
      all: messages,
      create: function (message) {
        return messages.$add(message);
      },
      get: function (messageId) {
        return $firebase(ref.child('messages').child(messageId)).$asObject();
      },
      delete: function (message) {
        return messages.$remove(message);
      }
    };

})
*/

.factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
})

.service('myLogin', function() {
 
  return {
      username: ''
  }

})

.service('limitChat', function() {
 
  return {
      limit: 1
  }

})


.factory('Messages', function($firebaseArray, limitChat) {

  $data = [];
  $dataType = [];
  var db = firebase.database().ref("chat")
          .orderByKey()
          //.limitToLast(limitChat.limit)
          ;

  var dbType = firebase.database().ref("typing").orderByKey();
  
  //var userId = firebase.auth().currentUser.uid;
  var newPostKey_1 = firebase.database().ref("typing").child('typing').push().key;

  var pesan = {
    all: function(){

      
      db.on('child_added', function(snapshot) {
        $data.push(snapshot.val());
      })

      return $firebaseArray(db);

    },
    create: function(pesannya){
      var newPostKey = firebase.database().ref("chat").child('chat').push().key;
      return firebase.database().ref('chat/' + newPostKey ).set(pesannya);
    },
    createType:function(pesannya){
      return firebase.database().ref( 'typing/' + newPostKey_1 ).set(pesannya);
      //return firebase.database().ref( 'typing').remove();
    },
    removeType:function(pesannya){
      //return firebase.database().ref( 'typing/' + newPostKey_1 ).set(pesannya);
      return firebase.database().ref( 'typing').remove();
    },
    allType: function(){

      
      dbType.on('child_added', function(snapshot) {
        $dataType.push(snapshot.val());
      })

      return $firebaseArray(dbType);

    }


  }

  return pesan;

})

;


/*var ref = firebase.database().ref('/tasks/' + userUID);
//I am doing a child based listener, but you can use .once('value')...
ref.on('child_added', function(data) {
   //data.key will be like -KPmraap79lz41FpWqLI
   addNewTaskView(data.key, data.val().title);
});

ref.on('child_changed', function(data) {
   updateTaskView(data.key, data.val().title);
});

ref.on('child_removed', function(data) {
   removeTaskView(data.key, data.val().title);
});*/