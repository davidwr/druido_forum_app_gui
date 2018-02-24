app.controller('NewPostCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', '$window', 'PopUpService', 'UserService',
  function ($scope, $http, $config, $ionicPopup, $timeout, $window, popupService, userService) {
    $scope.data = {};
    var user = userService.getUserLogged()

    $scope.create = function () {
      var newPost = {
        title: $scope.data.title,
        description: $scope.data.description,
        dd_category: $scope.data.category.id
      }

      console.log(newPost);

      $http({
        method: 'POST', url: $config.host + 'post/',
        data: newPost,
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $scope.posts = response.data
          popupService.showAlertPopup('Success!', 'New post created!');
          $window.location.assign('#/landing');
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
        });
    }

    $scope.cancel = function () {
      $window.location.assign('#/landing');
    }

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
      console.log('Init NewPostCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        userService.resetUserLogged();
        $window.location.assign('#/login');
      }
      user = userService.getUserLogged();
      $scope.data.name = user.name
      getCategories()
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

  }])