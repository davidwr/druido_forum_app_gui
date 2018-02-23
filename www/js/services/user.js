app.service('UserService', function () {
  this.userLogged = {};

  this.addUserLogged = function (user) {
    this.userLogged = user;
  };

  this.getUserLogged = function () {
    return this.userLogged;
  };

  this.resetUserLogged = function () {
    this.userLogged = {};
  }
});