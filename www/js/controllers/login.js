app.controller('LoginCtrl', ['$scope', '$http', 'CONFIG', function ($scope, $http, $config) { 
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
}])
