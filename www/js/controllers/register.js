app.controller('RegisterCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', '$window', 'PopUpService',
  function ($scope, $http, $config, $ionicPopup, $timeout, $window, popUpService) {

    $scope.register = function () {
      var dataSend = new FormData();
      // dataSend.append('image', $scope.image);
      dataSend.append('username', $scope.username);
      dataSend.append('password', $scope.password);
      dataSend.append('name', $scope.name);
      dataSend.append('email', $scope.email);

      var Send = {
        method: 'POST',
        url: $config.host + 'user',
        headers: { 'Content-Type': undefined },
        data: dataSend,
        timeout: 30000
      };
      $http(Send)
        .success(function (response) {
          popUpService.showAlertPopup('Success!', response.data);
        })
        .error(function (response) {
          popUpService.showAlertPopup('Error!', response.data);
        });
    }

  }]);
