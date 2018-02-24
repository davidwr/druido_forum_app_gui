const app = angular.module('druido', ['ionic'])

.constant('CONFIG', {
  host: 'http://localhost:3001/api/v1/',
  host_prod: 'http://ec2-18-220-34-186.us-east-2.compute.amazonaws.com:3001/api/v1/'
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

  .config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    cache: false
  })

  .state('register', {
    url: '/register',
    templateUrl: 'views/register.html',
    cache: false
  })

  .state('landing', {
    url: '/landing',
    templateUrl: 'views/landing.html',
    cache: false
  })

  .state('newpost', {
    url: '/newpost',
    templateUrl: 'views/new_post.html',
    cache: false
  })

  .state('post', {
    url: '/post',
    templateUrl: 'views/post.html',
    cache: false
  })

  .state('comment', {
    url: '/comment',
    templateUrl: 'views/comment.html',
    cache: false
  })

  $urlRouterProvider.otherwise('/login');

});
