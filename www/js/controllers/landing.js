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

    $scope.logout = function () {
      $http({
        method: 'GET', url: $config.host + 'logout/'
      }).
        then(function (response) {
          $window.location.assign('#/login');
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    $scope.initController = function () {
      if (!user.name) {        
        $window.location.assign('#/login');
      }
      $scope.data.name = user.name
      getCategories()
    }
  }])