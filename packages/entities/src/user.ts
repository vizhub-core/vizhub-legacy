export class User {

  // Whether or not the user is authenticated.
  authenticated: boolean;

  // The unique ID of this user.
  id: string;

  // This user's unique camelCase user name.
  userName: string;

  // This user's full name (first name, last name).
  fullName: string;

  // The email address of this user.
  email: string;

  constructor(data) {
    this.authenticated = data.authenticated;
    this.id = data.id;
    this.userName = data.userName;
    this.fullName = data.fullName;
    this.email = data.email;
  }
}
