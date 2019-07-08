import { User } from 'vizhub-entities';
import { USER } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';

export const getUser = connection => async (id) => {
  try {
    const userDoc = await fetchShareDBDoc(USER, id, connection);
    return new User(userDoc.data);
  } catch (error) {
    return null;
  }
}
