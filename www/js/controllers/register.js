app.controller('RegisterCtrl', ['$scope', '$http', 'CONFIG', '$window', 'PopUpService',
  function ($scope, $http, $config, $window, popupService) {

    $scope.register = function () {
      var user = {
        username: $scope.username,
        password: $scope.password,
        name: $scope.name,
        email: $scope.email,
      }
      $http({
        method: 'POST', url: $config.host + 'user/',
        data: user,
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          popupService.showAlertPopup('Success!', 'Please check your e-mail to confirm your account. Check your spam folder.');
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
        });
    }

  }]);
