app.controller('LandingCtrl', ['$scope', '$http', 'CONFIG', '$window', 'PopUpService', 'LogoutService',
  function ($scope, $http, $config, $window, popupService, logoutService) {
    $scope.categories = [];
    $scope.data = {};
    $scope.data.categorySelected = {};

    $scope.filters = [
      {
        id: 1,
        name: 'Recents',
        value: 'recents'
      },
      {
        id: 2,
        name: 'Most rated',
        value: 'most_rated'
      },
      {
        id: 3,
        name: 'Most commented',
        value: 'most_commented'
      }
    ];

    $scope.data.filterSelected = $scope.filters[0];

    function getCategories () {
      $http({
        method: 'GET', url: $config.host + 'category/'
      }).
        then(function (response) {
          $scope.categories = response.data
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.getPosts = function () {
      if ($scope.data.categorySelected.id) {
        return $scope.getPostsByCategory();
      }

      $http({
        method: 'GET', url: $config.host + 'post/',
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        params: {
          [$scope.data.filterSelected.value]: true
        }
      }).
        then(function (response) {
          $scope.posts = response.data;
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.logout = function () {
      logoutService.logout();
    }

    $scope.getCategoryLabel = function (categoryId) {
      var result = ['Unknown'];
      if ($scope.categories) {
        result = $scope.categories.filter(function (category) {
          return category.id == categoryId;
        });
      }

      return result[0].name;
    }

    $scope.createPost = function () {
      $window.location.assign('#/newpost');
    }

    $scope.openPost = function (post) {
      $window.localStorage.setItem('post_id', post.id);
      $window.localStorage.setItem('post_title', post.title);
      $window.localStorage.setItem('post_description', post.description);
      $window.localStorage.setItem('post_dd_category', post.dd_category);
      $window.localStorage.setItem('post_dd_user', post.dd_user);
      $window.localStorage.setItem('post_dd_user_name', post.name);
      $window.localStorage.setItem('post_likes', post.likes);
      $window.location.assign('#/post');
    }

    $scope.getPostsByCategory = function () {
      $http({
        method: 'GET', url: $config.host + 'post/category/' + $scope.data.categorySelected.id,
        headers: {
          'token': $window.localStorage.getItem('token')
        },
        params: {
          [$scope.data.filterSelected.value]: true
        }
      }).
        then(function (response) {
          $scope.posts = response.data;
          console.log('Success!' + JSON.stringify(response.data));
        }, function (response) {
          popupService.showAlertPopup('Error!', response.data);
          console.log('Error!' + JSON.stringify(response.data));
        });
    }

    $scope.initController = function () {
      console.log('Init LandingCtrl');
      if ($window.localStorage.getItem('logged') !== 'true') {
        $window.localStorage.clear();
        $window.location.assign('#/login');
      }
      $scope.data.name = $window.localStorage.getItem('user_name');
      getCategories();
      $scope.getPosts();
    }

    $scope.cleanFilters = function () {
      $scope.data.filterSelected = $scope.filters[0];
      $scope.data.categorySelected = {};
      $scope.searchPost = '';
      $scope.getPosts();
    }

    $scope.changePassword = function () {
      $window.location.assign('#/changepassword');
    }
  }])