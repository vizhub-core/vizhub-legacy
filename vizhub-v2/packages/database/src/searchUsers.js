import { User } from 'vizhub-entities';
import { USER } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

const pageSize = 10;

export const searchUsers = (connection) => async ({ query, offset }) => {
  const mongoQuery = {
    $limit: pageSize,
    $skip: offset * pageSize,
    $or: [
      { userName: { $regex: query, $options: 'i' } },
      { fullName: { $regex: query, $options: 'i' } },
    ],
  };
  const results = await fetchShareDBQuery(USER, mongoQuery, connection);

  // Uncomment to introduce delay for manual testing.
  //const foo = await new Promise(resolve => {setTimeout(() => resolve(), 3000);});
  return results.map((shareDBDoc) => new User(shareDBDoc.data));
};
