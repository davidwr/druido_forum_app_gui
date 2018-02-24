app.controller('CommentCtrl', ['$scope', '$http', 'CONFIG', '$window', 'PopUpService', 'LogoutService',
  function ($scope, $http, $config, $window, popupService, logoutService) {
    $scope.data = {};

    $scope.getComments = function () {
      $http({
        method: 'GET', url: $config.host + 'comment/post/' + $window.localStorage.getItem('post_id'),
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $scope.comments = response.data;
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.logout = function () {
      logoutService.logout();
    }

    $scope.vote = function (comment, relevance) {
      $http({
        method: 'PUT', url: $config.host + 'relevance/',
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        data: {
          positive: relevance,
          dd_user: $window.localStorage.getItem('user_id'),
          dd_comment: comment.id
        }
      }).
        then(function (response) {
          $window.location.reload(true);
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.comment = function () {
      var comment = {
        message: $scope.data.message,
        dd_user: $window.localStorage.getItem('user_id'),
        dd_post: $window.localStorage.getItem('post_id')
      };
      $http({
        method: 'POST', url: $config.host + 'comment/',
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        data: comment
      }).
        then(function (response) {
          $scope.getComments();
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.checkEditPermission = function () {
      return $window.localStorage.getItem('isEditComment') == 'true';
    }

    $scope.editComment = function (comment) {
      if (comment.dd_user == $window.localStorage.getItem('user_id')) {
        $window.localStorage.setItem('isEditComment', 'true');
        $scope.data.message = angular.copy(comment.message);
        $scope.data.commentId = comment.id
      }
    }

    $scope.submitEditComment = function () {
      var comment = {
        message: $scope.data.message,
        dd_user: $window.localStorage.getItem('user_id'),
        dd_post: $window.localStorage.getItem('post_id')
      };
      $http({
        method: 'PUT', url: $config.host + 'comment/' + $scope.data.commentId,
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        data: comment
      }).
        then(function (response) {          
          $scope.initController();
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          $scope.initController();
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.initController = function () {
      console.log('Init CommentCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        $window.localStorage.clear();
        $window.location.assign('#/login');
      }
      $window.localStorage.setItem('isEditComment', 'false');
      $scope.data.message = '';
      $scope.data.name = $window.localStorage.getItem('user_name');
      $scope.getComments();
    }
  }])