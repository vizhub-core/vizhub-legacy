import { sampleStudioData } from 'vizhub-common';

// Set up initial document for testing during development.
export const initializeSampleStudioData = connection => {
  Object.keys(sampleStudioData.vizSnapshots).forEach(vizId => {
    const vizData = sampleStudioData.vizSnapshots[vizId].data;
    const viz = connection.get('viz', vizId);
    viz.fetch(err => {
      if (err) throw err;
      if (viz.type === null) {
        viz.create(vizData);
        return;
      }
    });
  });
};
