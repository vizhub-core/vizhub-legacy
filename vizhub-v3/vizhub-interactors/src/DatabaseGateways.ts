import { VizId, VizInfo, VizContent } from 'vizhub-entities';
import { Gateways } from './Gateways';
import { vizInfoNotFound, vizContentNotFound } from './errors';
import { diff } from './ot';

type ShareDBConnection = any;

const VIZ_INFO_COLLECTION: CollectionName = 'vizInfo';
const VIZ_CONTENT_COLLECTION: CollectionName = 'vizContent';

// Fetches a ShareDB Doc. See also:
// https://share.github.io/sharedb/api/doc
const fetchDoc = (
  collectionName: string,
  id: string,
  shareDBConnection: ShareDBConnection
): ShareDBDoc =>
  new Promise((resolve, reject) => {
    const shareDBDoc = shareDBConnection.get(collectionName, id);
    shareDBDoc.fetch((error) => {
      error ? reject(error) : resolve(shareDBDoc);
    });
  });

// Fetches ShareDB query results. See also:
// https://share.github.io/sharedb/api/query
// https://share.github.io/sharedb/api/connection#createfetchquery
const fetchQuery = (collectionName, mongoQuery, shareDBConnection) =>
  new Promise((resolve, reject) => {
    const query = shareDBConnection.createFetchQuery(
      collectionName,
      mongoQuery,
      {},
      (error, results) => {
        error ? reject(error) : resolve(results);

        // Avoid memory leak.
        // See https://github.com/share/sharedb/blob/4067b0c5d194a1e4078d52dadd668492dafe017b/lib/client/connection.js#L541
        query.destroy();
      }
    );
  });

// Saves a fetched ShareDB doc (upsert).
const saveDoc = (doc: ShareDBDoc, data) =>
  new Promise((resolve, reject) => {
    const callback = (error) => (error ? reject(error) : resolve(null));
    if (!doc.type) {
      doc.create(data, callback);
    } else {
      doc.submitOp(diff(doc.data, data), callback);
    }
  });

// Deletes a fetched ShareDB doc.
const deleteDoc = (doc: ShareDBDoc, data) =>
  new Promise((resolve, reject) => {
    doc.del((error) => (error ? reject(error) : resolve(null)));
  });

// An database backed implementation for gateways,
// for use in production.
export const DatabaseGateways = (
  shareDBConnection: ShareDBConnection
): Gateways => {
  const fetchVizInfoDoc = async (vizId) =>
    await fetchDoc(VIZ_INFO_COLLECTION, vizId, shareDBConnection);

  const fetchVizContentDoc = async (vizId) =>
    await fetchDoc(VIZ_CONTENT_COLLECTION, vizId, shareDBConnection);

  const fetchVizInfoQuery = async (mongoQuery) =>
    await fetchQuery(VIZ_INFO_COLLECTION, mongoQuery, shareDBConnection);

  return {
    saveVizInfo: async (vizInfo) => {
      await saveDoc(await fetchVizInfoDoc(vizInfo.id), vizInfo);
      return null;
    },

    getVizInfo: async (vizId) => {
      const doc = await fetchVizInfoDoc(vizId);
      if (!doc.type) {
        throw vizInfoNotFound(vizId);
      }
      return doc.toSnapshot();
    },

    deleteVizInfo: async (vizId) => {
      await deleteDoc(await fetchVizInfoDoc(vizId));
    },

    saveVizContent: async (vizContent) => {
      await saveDoc(await fetchVizContentDoc(vizContent.id), vizContent);
      return null;
    },

    getVizContent: async (vizId) => {
      const doc = await fetchVizContentDoc(vizId);
      if (!doc.type) {
        throw vizContentNotFound(vizId);
      }
      return doc.toSnapshot();
    },

    deleteVizContent: async (vizId) => {
      await deleteDoc(await fetchVizContentDoc(vizId));
      return null;
    },

    getForks: async (vizId) => {
      return (
        await fetchVizInfoQuery({
          forkedFrom: vizId,
        })
      ).map((doc) => doc.toSnapshot());
    },
  };
};
