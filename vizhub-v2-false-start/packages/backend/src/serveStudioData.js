import { sampleStudioData } from 'vizhub-core';
import { snapshot } from './snapshot';

export const serveStudioData = connection => (req, res) => {
  const { vizId } = req.params;
  const viz = connection.get('viz', vizId);
  viz.fetch(err => {
    if (err) {
      // TODO figure out when this error would occur. Missing DB connection?
      console.log('TODO test and handle this case');
      return res.setStatus(500).send(err);
    }
    if (viz.type === null) {
      return res.sendStatus(404);
    }
    const {
      userData,
      authenticatedUserId,
      ownerUserId,
      comments
    } = sampleStudioData;

    const vizSnapshots = {};
    vizSnapshots[vizId] = snapshot(viz);

    const studioData = {
      vizSnapshots,
      userData,
      authenticatedUserId,
      comments
    };
    //console.log(studioData);
    res.send(studioData);
  });
};
