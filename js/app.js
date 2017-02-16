// Ionic Starter App
var link_dir ="/ionic/ionic_server/";

var link = localStorage.getItem("token_koneksi");

var link_getData_Barang = link +"/ionic/ionic_server/getData_barang.php";
var link_getData_Kelas = link +"/ionic/ionic_server/getData_kelas.php";
var link_getData_Jam = link +"/ionic/ionic_server/getData_jam.php";
var link_getData_ListPemesanan = link +"/ionic/ionic_server/getData_ListPemesanan1.php";

var link_setData_Pemesanan = link +"/ionic/ionic_server/cekData_Pemesanan.php";

var link_delData_Pemesanan = link +"/ionic/ionic_server/delData_Pemesanan.php";

//var link_setData_Pemesanan = link +"/ionic_server/setData_pemesanan.php";

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-datepicker', 'onezone-datepicker'])

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


.factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
});

;
