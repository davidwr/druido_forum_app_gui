app.controller('NewPostCtrl', ['$scope', '$http', 'CONFIG', '$window', 'PopUpService', 'LogoutService',
  function ($scope, $http, $config, $window, popupService, logoutService) {
    $scope.data = {};
    $scope.categories = [];

    $scope.create = function () {
      var newPost = {
        title: $scope.data.title,
        description: $scope.data.description,
        dd_category: $scope.data.category.id
      }

      $http({
        method: 'POST', url: $config.host + 'post/',
        data: newPost,
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $scope.posts = response.data;
          popupService.showAlertPopup('Success!', 'New post created!');
          $window.location.assign('#/landing');
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
        });
    }

    $scope.home = function () {
      $window.location.assign('#/landing');
    }

    $scope.edit = function () {
      var newPost = {
        title: $scope.data.title,
        description: $scope.data.description,
        dd_category: $scope.data.category.id
      }

      $http({
        method: 'PUT', url: $config.host + 'post/' + $window.localStorage.getItem('post_id'),
        data: newPost,
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $window.localStorage.setItem('isEditPost', 'false');
          $scope.posts = response.data;
          popupService.showAlertPopup('Success!', 'New post created!');
          $window.location.assign('#/landing');
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
        });
    }

    $scope.cancel = function () {
      $window.localStorage.setItem('isEditPost', 'false');
      $window.location.assign('#/landing');
    }

    function getCategories(callback) {
      $http({
        method: 'GET', url: $config.host + 'category/'
      }).
        then(function (response) {
          $scope.categories = response.data
          $scope.data.category = $scope.categories[0]
          if (callback) {
            return callback();
          }
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
          if (callback) {
            return callback();
          }
        });
    }

    $scope.logout = function () {
      logoutService.logout();
    }

    $scope.isEdit = function () {
      return $window.localStorage.getItem('isEditPost') === 'true'
    }

    $scope.initController = function () {
      console.log('Init NewPostCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        $window.localStorage.clear();
        $window.location.assign('#/login');
      }
      $scope.data.name = $window.localStorage.getItem('user_name');
      getCategories(function () {
        if ($scope.isEdit()) {
          $scope.data.title = $window.localStorage.getItem('post_title');
          $scope.data.description = $window.localStorage.getItem('post_description');

          var filteredCategories = $scope.categories.filter(function (category) {
            return category.id == $window.localStorage.getItem('post_dd_category');
          });

          $scope.data.category = filteredCategories[0]
        }
      });
    }
  }])