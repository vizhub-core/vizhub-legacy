import { sampleStudioData } from 'vizhub-common';
import { avoidBackend } from '../../environment';

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
