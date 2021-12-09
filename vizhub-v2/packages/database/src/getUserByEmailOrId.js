import { i18n } from 'vizhub-i18n';
import { USER } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getUserByEmailOrId = (connection) => async (email, id) => {
  try {
    const mongoQuery = {
      $or: [{ email: email }, { id: id }],
    };
    const results = await fetchShareDBQuery(USER, mongoQuery, connection);
    const userDoc = results[0];

    return userDoc.data;
  } catch (error) {
    return null;
  }
};
