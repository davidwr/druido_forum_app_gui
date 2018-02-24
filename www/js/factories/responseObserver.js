app.factory('responseObserver', function responseObserver($q, $window) {
  return {
    'responseError': function (errorResponse) {
      console.log(errorResponse);
      switch (errorResponse.status) {
        case 403:
          $window.localStorage.clear();
          $window.location.assign('#/login');
          break;
        case 500:
          $window.localStorage.clear();
          $window.location.assign('#/login');
          break;
      }
      return $q.reject(errorResponse);
    }
  };
});