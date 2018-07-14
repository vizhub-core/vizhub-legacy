import { i18n } from 'datavis-tech-i18n';

export const fetchShareDBDoc = (collection, id, connection) => (
  new Promise((resolve, reject) => {
    const shareDBDoc = connection.get(collection, id);
    shareDBDoc.fetch(error => error
      ? reject(error)
      : shareDBDoc.type
        ? resolve(shareDBDoc)
        : reject({ message: i18n('errorDocNotFound'), statusCode: 404 })
    );
  })
);
