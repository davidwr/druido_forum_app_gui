app.service('PopUpService', function ($ionicPopup, $timeout) {
  this.showAlertPopup = function (title, message) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: message
    });

    $timeout(function () {
      alertPopup.close();
    }, 10000);
  }
});