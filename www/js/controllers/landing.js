app.controller('LandingCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', '$window', 
  'PopUpService', 'UserService', 'PostService',
  function ($scope, $http, $config, $ionicPopup, $timeout, $window, popupService, userService, postService) {

    $scope.categories = []
    $scope.data = {}
    var user = userService.getUserLogged()

    function getCategories () {
      $http({
        method: 'GET', url: $config.host + 'category/'
      }).
        then(function (response) {
          $scope.categories = response.data
          $scope.categorySelected = $scope.categories[0]
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    function getPosts() {
      $http({
        method: 'GET', url: $config.host + 'post/',
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $scope.posts = response.data
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    $scope.logout = function () {
      $http({
        method: 'GET', url: $config.host + 'logout/',
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $window.localStorage.setItem('logged', 'false');
          userService.resetUserLogged();
          $window.localStorage.removeItem('token');
          $window.location.assign('#/login');
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    $scope.getCategoryLabel = function (categoryId) {
      var result = ['Unknown'];
      if ($scope.categories) {
        result = $scope.categories.filter(function (category) {
          return category.id == categoryId;
        });
      }

      return result[0].name;
    }

    $scope.createPost = function () {
      $window.location.assign('#/newpost');
    }

    $scope.openPost = function (post) {
      postService.addPostOpen(post);
      $window.location.assign('#/post');
    }

    $scope.initController = function () {
      console.log('Init LandingCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        userService.resetUserLogged();
        $window.location.assign('#/login');
      }
      user = userService.getUserLogged();
      $scope.data.name = user.name;
      getCategories();
      getPosts();
    }
  }])