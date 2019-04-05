import { useEffect, useContext, useReducer } from 'react';
import { ErrorContext, VizHubError } from '../error';
import { wait } from './wait';
import { sampleStudioData } from 'vizhub-core';

// Convenience for stubbing out the backend during development.
//const avoidBackend = true;
const avoidBackend = false;

const reducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return Object.assign({}, state, {
        [action.vizId]: {
          isFetching: true
        }
      });
    case 'receive':
      return Object.assign({}, state, {
        [action.vizId]: {
          isFetching: false,
          studioData: action.studioData
        }
      });
    default:
      throw new Error();
  }
};

const request = vizId => ({ type: 'request', vizId });
const receive = (vizId, studioData) => ({ type: 'receive', vizId, studioData });

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
const fetchStudioData = avoidBackend
  ? fetchFakeStudioData
  : fetchRealStudioData;

// TODO add automated test for this logic, so it can be cleaned.
const needsFetching = (state, vizId) => {
  if (state[vizId]) {
    return !state[vizId].isFetching;
  }
  return true;
};

export const useStudioData = vizId => {
  const [state, dispatch] = useReducer(reducer, {});
  const setError = useContext(ErrorContext);

  useEffect(() => {
    if (needsFetching(state, vizId)) {
      dispatch(request(vizId));
      Promise.all([fetchStudioData(vizId), wait(800)]).then(([response]) => {
        if (!response.ok) {
          response.text().then(text => {
            setError(
              new VizHubError({
                statusCode: response.status,
                title: response.statusText,
                message: text
              })
            );
          });
        } else {
          response.json().then(studioData => {
            dispatch(receive(vizId, studioData));
          });
        }
      });
    }
  }, [vizId]);

  return state[vizId] && state[vizId].studioData;
};
