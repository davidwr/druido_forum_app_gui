app.controller('PostCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', '$window', 
  'PopUpService', 'UserService', 'PostService',
  function ($scope, $http, $config, $ionicPopup, $timeout, $window, popupService, userService, postService) {
    $scope.data = {};
    var user = userService.getUserLogged();
    var post = postService.getPostOpen();

    function getCategories() {
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

    $scope.initController = function () {
      console.log('Init PostCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        userService.resetUserLogged();
        $window.location.assign('#/login');
      }
      user = userService.getUserLogged();
      post = postService.getPostOpen();
      $scope.data.name = user.name;
      $scope.data.title = post.title;
      $scope.data.description = post.description;
      getCategories();
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

    $scope.openComments = function () {
      $window.location.assign('#/comment');
    }

  }])