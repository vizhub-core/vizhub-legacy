import { User } from 'vizhub-entities';
import { USER } from './collectionName';
import { fetchShareDBQuery } from './fetchShareDBQuery';

// The number of vizzes shown in a page of content.
// Infinite scroll pagination fetches the next page.
const pageSize = 100;

export const searchUsers = connection => async ({
  query,
  offset
}) => {
  const mongoQuery = {
    $limit: pageSize,
    $skip: offset * pageSize,
    userName: { $regex: `.*${query}.*` }
  };
  const results = await fetchShareDBQuery(
    USER,
    mongoQuery,
    connection
  );

  // Uncomment to introduce delay for manual testing.
  //const foo = await new Promise(resolve => {setTimeout(() => resolve(), 3000);});
  return results.map(shareDBDoc => new User(shareDBDoc.data));
};
