class UserViewModel {
  constructor(user) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserViewModel;
