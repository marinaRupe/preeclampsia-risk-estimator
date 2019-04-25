class UserLoginViewModel {
  constructor(user, token) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.token = token;
  }
}

module.exports = UserLoginViewModel;
