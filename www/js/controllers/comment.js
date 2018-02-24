app.controller('CommentCtrl', ['$scope', '$http', 'CONFIG', '$ionicPopup', '$timeout', '$window',
  'PopUpService', 'UserService', 'PostService',
  function ($scope, $http, $config, $ionicPopup, $timeout, $window, popupService, userService, postService) {
    $scope.data = {};
    var user = userService.getUserLogged()
    var post = postService.getPostOpen()

    function getComments() {
      $http({
        method: 'GET', url: $config.host + 'comment/post/' + post.id,
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $scope.comments = response.data
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    $scope.initController = function () {
      console.log('Init CommentCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        userService.resetUserLogged();
        $window.location.assign('#/login');
      }
      user = userService.getUserLogged();
      post = postService.getPostOpen();
      $scope.data.name = user.name;
      getComments();
    }

    $scope.logout = function () {
      $http({
        method: 'GET', url: $config.host + 'logout/',
        headers: {
          'token': $window.localStorage.getItem('token')
        }
      }).
        then(function (response) {
          $window.localStorage.setItem('logged', 'false');
          $window.localStorage.removeItem('token');
          userService.resetUserLogged();
          $window.location.assign('#/login');
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    $scope.vote = function (comment, relevance) {
      $http({
        method: 'PUT', url: $config.host + 'relevance/',
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        data: {
          positive: relevance,
          dd_user: user.id,
          dd_comment: comment.id
        }
      }).
        then(function (response) {
          $window.location.assign('#/comment');
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

    $scope.comment = function () {
      var comment = {
        message: $scope.data.message,
        dd_user: user.id,
        dd_post: post.id
      };
      $http({
        method: 'POST', url: $config.host + 'comment/',
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        data: comment
      }).
        then(function (response) {
          $window.location.assign('#/comment');
          console.log('Success!' + JSON.stringify(response.data))
        }, function (response) {
          console.log('Error!' + JSON.stringify(response.data))
        });
    }

  }])