import { createInstance } from './createInstance';

export function User(data) {
  return createInstance(User, data);
}

User.keys = [
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
];
