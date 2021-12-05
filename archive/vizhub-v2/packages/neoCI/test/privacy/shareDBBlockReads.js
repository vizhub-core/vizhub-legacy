import assert from 'assert';
import { DOCUMENT_INFO } from 'vizhub-database';

// TODO make this work
//
//  * [ ] If a user is not whitelisted to access the private viz feature, block changes of privacy to private in ShareDB middleware.
export const shareDBBlockReads = (my) => async () => {
  const id = my.privateVizId;
  const collection = DOCUMENT_INFO;
  console.log('before');
  await my.page.waitFor(() => window.shareDBConnection);
  console.log('after');
  await my.page.evaluate(() => {
    const connection = window.shareDBConnection;
    const doc = connection.get(collection, id);
  });
};
