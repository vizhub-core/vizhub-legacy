import assert from 'assert';
import { DOCUMENT_INFO } from 'vizhub-database';

export const shareDBBlockReads = my => async () => {
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
