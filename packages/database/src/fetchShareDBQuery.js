import { i18n } from 'vizhub-i18n';

export const fetchShareDBQuery = (collection, mongoQuery, connection) =>
  new Promise((resolve, reject) => {
    const query = connection.createFetchQuery(
      collection,
      mongoQuery,
      {},
      (error, results) => {
        error ? reject(error) : resolve(results);
        //query.destroy();
      }
    );
  });
