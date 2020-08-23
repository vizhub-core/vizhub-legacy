import { i18n } from 'vizhub-i18n';
import { USER } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getUserByEmail = (connection) => async (email) => {
  try {
    const userDoc = await fetchShareDBDoc(USER, id, connection);
    return new User(userDoc.data);
  } catch (error) {
    return null;
  }
};
