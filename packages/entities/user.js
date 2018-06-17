// This file represents the domain entity called User.
export const User = data => ({

  // All of these values are derived from GitHub authentication.

  // The unique ID of the user.
  gitHubId: data.gitHubId,

  // The unique camelCase user name.
  userName: data.userName,

  // The full name (first name, last name).
  fullName: data.fullName
});
