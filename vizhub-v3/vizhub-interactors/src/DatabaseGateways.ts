import { VizId, VizInfo, VizContent } from 'vizhub-entities';
import { Gateways } from './Gateways';
import { vizInfoNotFound, vizContentNotFound } from './errors';

type ShareDBConnection = any;

const VIZ_INFO_COLLECTION: CollectionName = 'vizInfo';
const VIZ_CONTENT_COLLECTION: CollectionName = 'vizContent';

// Saves a ShareDB doc (upsert).
const save = (doc: ShareDBDoc, data) =>
  new Promise((resolve, reject) => {
    const callback = (error) => (error ? reject(error) : resolve(null));
    if (!doc.type) {
      doc.create(data, callback);
    } else {
      doc.submitOp(diff(doc.data, data), callback);
    }
  });

const fetchShareDBDoc = (
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

// An database backed implementation for gateways,
// for use in production.
export const DatabaseGateways = (
  shareDBConnection: ShareDBConnection
): Gateways => {
  const fetchVizInfo = async (vizId) =>
    await fetchShareDBDoc(VIZ_INFO_COLLECTION, vizId, shareDBConnection);

  const fetchVizContent = async (vizId) =>
    await fetchShareDBDoc(VIZ_CONTENT_COLLECTION, vizId, shareDBConnection);

  return {
    saveVizInfo: async (vizInfo) => {
      await save(await fetchVizInfo(vizInfo.id), vizInfo);
      return null;
    },

    getVizInfo: async (vizId) => {
      const doc = await fetchVizInfo(vizId);
      if (!doc.type) {
        throw vizInfoNotFound(vizId);
      }
      return doc.toSnapshot();
    },

    deleteVizInfo: async (vizId) => {
      //     delete vizInfoById[vizId];
    },

    saveVizContent: async (vizContent) => {
      await save(await fetchVizContent(vizContent.id), vizContent);
      return null;
    },

    getVizContent: async (vizId) => {
      const doc = await fetchVizContent(vizId);
      if (!doc.type) {
        throw vizContentNotFound(vizId);
      }
      return doc.toSnapshot();
    },

    deleteVizContent: async (vizId) => {
      //   delete vizContentById[vizId];
    },

    getForks: async (vizId) => {
      //      Object.values(vizInfoById)
      //        .filter((vizInfo) => vizInfo.forkedFrom === vizId)
      //        .map(snapshot),
    },
  };
};
