import { sampleStudioData } from 'vizhub-common';

// Set up initial document for testing during development.
export const initializeSampleStudioData = connection => {
  const vizId = Object.keys(sampleStudioData.vizSnapshots)[0];
  const vizData = sampleStudioData.vizSnapshots[vizId].data;
  const viz = connection.get('viz', vizId);
  viz.fetch(err => {
    if (err) throw err;
    if (viz.type === null) {
      viz.create(vizData);
      return;
    }
  });
};
