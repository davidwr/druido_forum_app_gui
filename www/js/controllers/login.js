app.controller('LoginCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', 
  function ($scope, $http, $config, $ionicPopup, $timeout) {

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
          type: 'button-positive',
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
      console.log(res)
      $http({
        method: 'PUT', url: $config.host + 'forgot-password', data: {
          email: res
        }
      }).
        then(function (response) {
          alert('Request OK: ' + response.data);
        }, function (response) {
          alert('Request failed: ' + response.data);
        });
    });

    $timeout(function () {
      resetPasswordPopup.close();
    }, 10000);
  }


  $scope.login = function () {
    $http({
      method: 'POST', url: $config.host + 'login', data: {
      username: $scope.username,
      password: $scope.password
    }}).
      then(function (response) {
        alert('Request OK: ' + response.data);
      }, function (response) {
        alert('Request failed: ' + response.data);
      });
  };

  $scope.resetPassword = function () {    
    showResetPasswordPopup()
  };
}])
