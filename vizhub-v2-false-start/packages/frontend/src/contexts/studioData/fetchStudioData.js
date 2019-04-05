import { sampleStudioData } from 'vizhub-core';

// Convenience flag for stubbing out the backend during development.
//const avoidBackend = true;
const avoidBackend = false;

const fetchRealStudioData = vizId => fetch(`/api/studio/data/${vizId}`);
const fetchFakeStudioData = vizId =>
  Promise.resolve(
    vizId === Object.keys(sampleStudioData.vizSnapshots)[0]
      ? {
          ok: true,
          json: () => Promise.resolve(sampleStudioData)
        }
      : {
          ok: false,
          status: 404,
          statusText: 'Not found',
          text: () => Promise.resolve('This vis does not exist')
        }
  );

export const fetchStudioData = avoidBackend
  ? fetchFakeStudioData
  : fetchRealStudioData;
