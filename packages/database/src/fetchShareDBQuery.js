import { i18n } from 'datavis-tech-i18n';

export const fetchShareDBQuery = (collection, mongoQuery, connection) => (
  new Promise((resolve, reject) => {
    connection.createFetchQuery(collection, mongoQuery, {}, (error, results) => (
      error ? reject(error) : resolve(results)
    ));
  })
);
