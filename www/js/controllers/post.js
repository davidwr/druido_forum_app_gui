app.controller('PostCtrl', ['$scope', '$http', 'CONFIG', '$window', 'PopUpService', 'LogoutService',
  function ($scope, $http, $config, $window, popupService, logoutService) {
    $scope.data = {};

    function getCategories() {
      $http({
        method: 'GET', url: $config.host + 'category/'
      }).
        then(function (response) {
          $scope.categories = response.data
          $scope.categorySelected = $scope.categories[0]
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    $scope.logout = function () {
      logoutService.logout();
    }

    $scope.openComments = function () {
      $window.location.assign('#/comment');
    }

    $scope.like = function () {
      $http({
        method: 'PUT', url: $config.host + 'like/',
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        data: {
          dd_user: $window.localStorage.getItem('user_id'),
          dd_post: $scope.data.id,
          liked: true
        }
      }).
        then(function (response) {
          $window.location.assign('#/landing');
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.checkEditPermission = function () {
      return $scope.data.dd_user == $window.localStorage.getItem('user_id');
    }

    $scope.editPost = function () {
      $window.localStorage.setItem('isEditPost', 'true');
      $window.location.assign('#/newpost');
    }

    $scope.deletePost = function () {
      $http({
        method: 'DELETE', url: $config.host + 'post/' + $scope.data.id,
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $window.location.assign('#/landing');
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.home = function () {
      $window.location.assign('#/landing');
    }

    $scope.initController = function () {
      console.log('Init PostCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        $window.localStorage.clear();
        $window.location.assign('#/login');
      }
      $scope.data.name = $window.localStorage.getItem('user_name');
      $scope.data.id = $window.localStorage.getItem('post_id');
      $scope.data.title = $window.localStorage.getItem('post_title');
      $scope.data.description = $window.localStorage.getItem('post_description');
      $scope.data.likes = $window.localStorage.getItem('post_likes');
      $scope.data.dd_user = $window.localStorage.getItem('post_dd_user');
      $scope.data.dd_category = $window.localStorage.getItem('post_dd_category');
      $scope.data.name = $window.localStorage.getItem('post_dd_user_name');
      getCategories();
    }
  }])