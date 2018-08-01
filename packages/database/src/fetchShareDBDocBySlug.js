import { i18n } from 'datavis-tech-i18n';

export const fetchShareDBDocBySlug = (collection, slug, connection) => (
  new Promise((resolve, reject) => {
    connection.createFetchQuery(collection, { slug }, {}, (error, results) => {
      error
        ? reject(error)
        : results.length > 0
          ? resolve(results[0])
          : reject({ message: i18n('errorDocNotFound'), statusCode: 404 })
    });
  })
);
