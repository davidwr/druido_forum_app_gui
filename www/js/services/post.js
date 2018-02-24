app.service('PostService', function () {
  this.postOpen = {};

  this.addPostOpen = function (user) {
    this.postOpen = user;
  };

  this.getPostOpen = function () {
    return this.postOpen;
  };

  this.resetPostOpen = function () {
    this.postOpen = {};
  }
});