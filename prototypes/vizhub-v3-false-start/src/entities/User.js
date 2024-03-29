import { createInstance } from './createInstance';

const keys = [
  // The unique ID of this user.
  'id',

  // This user's unique camelCase user name.
  'userName',

  // This user's full name (first name, last name).
  'fullName',

  // The email address of this user.
  'email',

  // The URL for loading this user's avatar image.
  'avatarUrl',

  // The company that this user works for (if provided).
  'company',

  // The URL of the website or blog associated with this user (if provided).
  'website',

  // The physical location of this user (if provided).
  'location',

  // Biography.
  'bio',

  // The plan that the user is on.
  // Possibly undefined (free plan) or "pro" (pro plan).
  // TODO move this to a plugin.
  'plan',

  // After a user upgrades to "pro" plan,
  // this is the Stripd customer ID.
  // Use: lookup the customer later when changing plans.
  // TODO move this to a plugin.
  'stripeCustomerId',
];

export function User(data) {
  return createInstance(User, keys, data);
}

// This defines a "CI User" for use in continuous integration testing.
export const ciUserData = {
  id: '47895473289547832938754',
  fullName: 'CI',
  email: 'ci@testing.com',
  userName: 'ci',
  avatarUrl: 'https://avatars0.githubusercontent.com/u/639823?v=4',
};
