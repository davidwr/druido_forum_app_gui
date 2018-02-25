app.controller('ChangePasswordCtrl', ['$scope', '$http', 'CONFIG', '$window', 'PopUpService', 'LogoutService',
  function ($scope, $http, $config, $window, popupService, logoutService) {
    $scope.data = {};

    $scope.changePassword = function () {
      $http({
        method: 'PUT', url: $config.host + 'user/' + $window.localStorage.getItem('user_id'),
        data: {
          password: $scope.data.newPassword
        },
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          popupService.showAlertPopup('Success!', 'Password changed.');
          $window.location.assign('#/landing');
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
        });
    }

    $scope.checkValidPassword = function () {
      return $scope.data.newPassword === $scope.data.confirmNewPassword;
    }

    $scope.home = function () {
      $window.location.assign('#/landing');
    }

    $scope.logout = function () {
      logoutService.logout();
    }

    $scope.initController = function () {
      console.log('Init ChangePasswordCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        $window.localStorage.clear();
        $window.location.assign('#/login');
      }
      $scope.data.name = $window.localStorage.getItem('user_name');
    }
  }])