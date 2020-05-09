import { i18n } from 'vizhub-i18n';

export const fetchShareDBDoc = (collection, id, connection) =>
  new Promise((resolve, reject) => {
    const shareDBDoc = connection.get(collection, id);
    shareDBDoc.fetch((error) => {
      error ? reject(error) : resolve(shareDBDoc);
    });
  });
