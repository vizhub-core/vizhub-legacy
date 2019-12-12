import { User } from 'vizhub-entities';
import { USER } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

export const getUsers = connection => async ids=> {
  try {
    const mongoQuery = {
      id:{$in: ids}
    };
    const userDocs = await fetchShareDBQuery(USER, mongoQuery, connection);
    return userDocs.map(userDoc => new User(userDoc.data));
  } catch (error) {
    console.log(error);
    return null;
  }
};
