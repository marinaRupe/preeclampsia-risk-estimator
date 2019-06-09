class UserViewModel {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	createdAt: string;

	constructor(user) {
  	this.id = user.id;
		this.firstName = user.firstName;
  	this.lastName = user.lastName;
  	this.email = user.email;
  	this.role = user.role;
  	this.createdAt = user.createdAt;
	}
}

export default UserViewModel;
