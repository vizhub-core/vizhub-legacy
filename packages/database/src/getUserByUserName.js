import { i18n } from 'vizhub-i18n';
import { USER } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getUserByUserName = connection => async userName => {
  const mongoQuery = { userName };
  const results = await fetchShareDBQuery(USER, mongoQuery, connection);
  if (results.length === 0) {
    throw {
      message: i18n('errorUserNotFound'),
      statusCode: 404
    };
  }
  const userDoc = results[0];
  return userDoc.data;
};
