import { sampleStudioData } from 'vizhub-common';
import { snapshot } from './snapshot';

export const serveStudioData = connection => (req, res) => {
  const { vizId } = req.params;
  const doc = connection.get('viz', vizId);
  doc.fetch(err => {
    if (err) return res.setStatus(500).send(err);
    if (doc.type === null) return res.sendStatus(404);

    // TODO migrate away from sample data
    const {
      userData,
      authenticatedUserId,
      ownerUserId,
      comments
    } = sampleStudioData;

    // TODO query for owner user id of forked viz.
    const forkedFromVizId = doc.data.forkedFromVizId;
    let forkedDocPromise;
    if (forkedFromVizId) {
      forkedDocPromise = new Promise((resolve, reject) => {
        const forkedDoc = connection.get('viz', doc.data.forkedFromVizId);
        forkedDoc.fetch(err => {
          resolve(forkedDoc);
        });
      });
    } else {
      forkedDocPromise = Promise.resolve(null);
    }

    forkedDocPromise.then(forkedDoc => {
      const vizSnapshots = {};
      vizSnapshots[vizId] = snapshot(doc);

      if (forkedDoc) {
        vizSnapshots[forkedFromVizId] = snapshot(forkedDoc);
      }

      const studioData = {
        vizSnapshots,
        userData,
        authenticatedUserId,
        comments
      };
      res.send(studioData);
    });
  });
};
