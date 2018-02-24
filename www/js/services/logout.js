app.service('LogoutService', ['$http', 'CONFIG', '$window', 'PopUpService', 
  function ($http, $config, $window, popupService) {
  this.logout = function () {
    $http({
      method: 'GET', url: $config.host + 'logout/',
      headers: {
        'token': $window.localStorage.getItem('token')
      }
    }).
      then(function (response) {
        $window.localStorage.clear();
        $window.location.assign('#/login');
        console.log('Success!' + JSON.stringify(response.data));
      }, function (response) {
        popupService.showAlertPopup('Error!', response.data);
        console.log('Error!' + JSON.stringify(response.data));
      });
  }
}]);