app.service('PopUpService', function ($ionicPopup, $timeout) {
  this.showAlertPopup = function (title, message) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: message,
      buttons: [
        {
          text: '<b>Ok</b>',
          type: 'button button-druido',
          onTap: function (e) {
            return ''
          }
        }
      ]
    });

    $timeout(function () {
      alertPopup.close();
    }, 10000);
  }
});