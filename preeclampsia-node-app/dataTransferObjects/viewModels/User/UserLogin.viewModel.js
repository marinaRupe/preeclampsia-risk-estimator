const UserViewModel = require('./User.viewModel');
class UserLoginViewModel {
  constructor(user, token) {
    this.user = new UserViewModel(user);
    this.token = token;
  }
}

module.exports = UserLoginViewModel;
