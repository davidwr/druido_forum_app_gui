app.service('UserService', function () {
  this.userLogged = {};

  this.addUserLogged = function (user) {
    this.userLogged = user;
    console.log(this.userLogged)
  };

  this.getUserLogged = function () {
    console.log(this.userLogged)
    return this.userLogged;
  };
});