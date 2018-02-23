app.controller('LandingCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', '$window', 'PopUpService', 'UserService',
  function ($scope, $http, $config, $ionicPopup, $timeout, $window, popupService, userService) {

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
          'token': user.hash
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
          'token': user.hash
        }
      }).
        then(function (response) {
          userService.resetUserLogged();
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

    $scope.initController = function () {
      if (!user.name) {
        $window.location.assign('#/login');
      }
      console.log(user);
      $scope.data.name = user.name
      getCategories()
      getPosts()
    }
  }])