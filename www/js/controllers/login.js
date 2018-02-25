app.controller('LoginCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', '$window', 
  'PopUpService',
  function ($scope, $http, $config, $ionicPopup, $timeout, $window, popupService) {

  $scope.register = function() {
    $window.location.assign('#/register');
  }

  function showResetPasswordPopup () {
    $scope.data = {}

    var resetPasswordPopup = $ionicPopup.show({
      template: '<input type="email" ng-model="data.email">',
      title: 'Enter your account e-mail',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Reset</b>',
          type: 'button button-druido',
          onTap: function (e) {
            if (!$scope.data.email) {
              e.preventDefault();
            } else {
              return $scope.data.email
            }
          }
        }
      ]
    });

    resetPasswordPopup.then(function (res) {
      if (!res) {
        return
      }

      $http({
        method: 'PUT', url: $config.host + 'forgot-password', data: {
          email: res
        }
      }).
        then(function (response) {
          popupService.showAlertPopup('Success!', response.data);
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
        });
    });

    $timeout(function () {
      resetPasswordPopup.close();
    }, 60000);
  }

  $scope.login = function () {
    $http({
      method: 'POST', url: $config.host + 'login', data: {
      username: $scope.username,
      password: $scope.password
    }}).
      then(function (response) {
        $window.localStorage.clear();
        $window.localStorage.setItem('logged', 'true');
        $window.localStorage.setItem('token', response.data.hash);
        $window.localStorage.setItem('user_id', response.data.id);
        $window.localStorage.setItem('user_name', response.data.name);
        $window.location.assign('#/landing');
        console.log('Success!' + 'Authenticated')
      }, function (response) {
        popupService.showAlertPopup('Error!', response.data);
        console.log('Error!', JSON.stringify(response.data));
      });
  };

  $scope.resetPassword = function () {    
    showResetPasswordPopup()
  };

  if ($window.localStorage.getItem('logged') === 'true') {
    $window.location.assign('#/landing');
  }

  $scope.initController = function () {
    if ($window.localStorage.getItem('logged') === 'true') {
      $window.location.assign('#/landing');
    } else {
      $window.localStorage.clear();
    }
  }
}])
