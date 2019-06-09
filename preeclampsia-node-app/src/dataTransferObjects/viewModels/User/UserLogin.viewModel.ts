import UserViewModel from './User.viewModel';

class UserLoginViewModel {
	user: UserViewModel;
	token: string;

	constructor(user, token) {
  	this.user = new UserViewModel(user);
  	this.token = token;
	}
}

export default UserLoginViewModel;
