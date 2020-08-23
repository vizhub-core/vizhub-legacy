import { i18n } from 'vizhub-i18n';
import { USER } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getUserByEmail = (connection) => async (email) => {
  try {
    const mongoQuery = { email };
    const results = await fetchShareDBQuery(USER, mongoQuery, connection);
    const userDoc = results[0];

    return userDoc.data;
  } catch (error) {
    return null;
  }
};
