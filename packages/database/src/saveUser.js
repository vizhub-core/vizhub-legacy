import { USER } from './collectionName';
import { fetchShareDBDoc } from './fetchShareDBDoc';
import { save } from './save';

export const saveUser = (connection) => async (user) => {
  const userDoc = await fetchShareDBDoc(USER, user.id, connection);
  return await save(userDoc, user);
};
