// Ionic Starter App
var link_dir ="/ionic/bookingApp/www/ionic_server/";

var link = localStorage.getItem("token_koneksi") + link_dir;

var link_getData_Kelas = link + "getData_kelas.php";
var link_getData_Jam = link + "getData_jam.php";
var link_getData_ListPemesanan = link + "getData_ListPemesanan1.php";
var link_getData_KelasCount = link + "getData_KelasCount.php";
var link_getData_HariCount = link + "getData_HariCount.php";

var link_setData_Pemesanan = link + "cekData_Pemesanan.php";

var link_delData_Pemesanan = link + "delData_Pemesanan.php";

var url_fireChat = "https://bookingapp-f3c5d.firebaseio.com/chat";


//var link_setData_Pemesanan = link +"/ionic_server/setData_pemesanan.php";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-datepicker', 'onezone-datepicker', 'chart.js', 
                            'ngCordova', 'firebase', 'angularMoment'])//, 'ionic.cloud'

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
  .state('login', {
      url: '/login',
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
  
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
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
  $urlRouterProvider.otherwise('/koneksi');
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



.factory('Messages', function($firebaseArray) {
  var messagesRef = new Firebase(url_fireChat);
  var sync = $firebaseArray(messagesRef);
  return {
    all: function() {
      return sync;
    },
    get: function(friendId) {
      return otherfriends[friendId];
    }
  }
  //return $firebaseArray(messagesRef);
})


.factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
})

.service('myLogin', function() {
 
  return {
      username: ''
  }


/*  var login = [];

  var addLogin = function(newObj) {
      login.push(newObj);
  };

  var getLogin = function(){
      return login;
  };

  return {
    addLogin: addLogin,
    getLogin: getLogin
  };
*/

})

;
