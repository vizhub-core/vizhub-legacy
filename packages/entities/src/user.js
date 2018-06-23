export class User {
  constructor(data) {

    // Whether or not the user is authenticated or not (boolean).
    this.authenticated = data.authenticated;

    // The unique ID of this user.
    this.id = data.id;

    // This user's unique camelCase user name.
    this.userName = data.userName;

    // This user's full name (first name, last name).
    this.fullName = data.fullName;

    // The email address of this user.
    this.email = data.email;

  }
}
