
// A unique identifier for a user.
export type UserId = string;

export class User {

  // Whether or not the user is authenticated.
  // DEPRECATED (not used in neoFrontend, neoBackend).
  authenticated: boolean;

  // The unique ID of this user.
  id: UserId;

  // This user's unique camelCase user name.
  userName: string;

  // This user's full name (first name, last name).
  fullName: string;

  // The email address of this user.
  email: string;

  // The URL for loading this user's avatar image.
  avatarUrl: string;

  // The company that this user works for (if provided).
  company: string;

  // The URL of the website or blog associated with this user (if provided).
  website: string;

  // The physical location of this user (if provided).
  location: string;

  // Biography.
  bio: string;

  constructor(data) {
    this.authenticated = data.authenticated;
    this.id = data.id;
    this.userName = data.userName;
    this.fullName = data.fullName;
    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.company = data.company;
    this.website = data.website;
    this.location = data.location;
    this.bio = data.bio;
  }
}
