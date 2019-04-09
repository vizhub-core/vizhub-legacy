import { sampleStudioData } from 'vizhub-core';
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

    const vizSnapshots = {};
    vizSnapshots[vizId] = snapshot(doc);

    const studioData = {
      vizSnapshots,
      userData,
      authenticatedUserId,
      comments
    };

    res.send(studioData);
  });
};
