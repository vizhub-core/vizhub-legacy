import { VizId, VizInfo, VizContent } from 'vizhub-entities';
import {
  VIZ_INFO_COLLECTION,
  VIZ_CONTENT_COLLECTION,
  USER_COLLECTION,
} from './DatabaseGatewaysConstants.ts';
import { Gateways } from './Gateways';
import {
  vizInfoNotFound,
  vizContentNotFound,
  userNotFound,
  userNotFoundByEmail,
} from './errors';
import { diff, otType } from './ot';

type ShareDBConnection = any;
type ShareDBDoc = any;
type CollectionName = string;

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
const fetchQuery = (
  collectionName,
  mongoQuery,
  shareDBConnection
): Promise<Array<ShareDBDoc>> =>
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
      doc.create(data, otType.uri, callback);
    } else {
      doc.submitOp(diff(doc.data, data), callback);
    }
  });

// Deletes a fetched ShareDB doc.
const deleteDoc = (doc: ShareDBDoc) =>
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

  const fetchUserDoc = async (userId) =>
    await fetchDoc(USER_COLLECTION, userId, shareDBConnection);

  const fetchUserQuery = async (mongoQuery) =>
    await fetchQuery(USER_COLLECTION, mongoQuery, shareDBConnection);

  return {
    saveVizInfo: async (vizInfo) => {
      await saveDoc(await fetchVizInfoDoc(vizInfo.id), vizInfo);
      return null;
    },

    getVizInfoSnapshot: async (vizId) => {
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

    getVizContentSnapshot: async (vizId) => {
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

    saveUser: async (user) => {
      await saveDoc(await fetchUserDoc(user.id), user);
      return null;
    },

    getUserSnapshot: async (userId) => {
      const doc = await fetchUserDoc(userId);
      if (!doc.type) {
        throw userNotFound(userId);
      }
      return doc.toSnapshot();
    },

    getUserSnapshotByEmail: async (email) => {
      const results = await fetchUserQuery({ email });

      if (results.length === 0) {
        throw userNotFoundByEmail(email);
      }

      return results[0].toSnapshot();
    },

    deleteUser: async (userId) => {
      await deleteDoc(await fetchUserDoc(userId));
    },
  };
};
