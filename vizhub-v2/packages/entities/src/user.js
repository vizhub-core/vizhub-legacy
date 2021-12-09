export class User {
  constructor(data) {
    // Whether or not the user is authenticated.
    // DEPRECATED (not used in neoFrontend, neoBackend).
    this.authenticated = data.authenticated;

    // The unique ID of this user.
    this.id = data.id;

    // This user's unique camelCase user name.
    this.userName = data.userName;

    // This user's full name (first name, last name).
    this.fullName = data.fullName;

    // The email address of this user.
    this.email = data.email;

    // The URL for loading this user's avatar image.
    this.avatarUrl = data.avatarUrl;

    // The company that this user works for (if provided).
    this.company = data.company;

    // The URL of the website or blog associated with this user (if provided).
    this.website = data.website;

    // The physical location of this user (if provided).
    this.location = data.location;

    // Biography.
    this.bio = data.bio;

    // The plan that the user is on.
    // Possibly undefined (free plan) or "pro" (pro plan).
    this.plan = data.plan;

    // After a user upgrades to "pro" plan,
    // this is the Stripd customer ID.
    // Use: lookup the customer later when changing plans.
    this.stripeCustomerId = data.stripeCustomerId;
  }
}
