import { USER } from './collectionName';

export const createUser = connection => user => {
  return new Promise(resolve => {
    connection.get(USER, user.id).create(user);
    resolve(user);
  });
}
