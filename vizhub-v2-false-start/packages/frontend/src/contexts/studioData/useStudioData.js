import { useEffect, useContext, useReducer } from 'react';
import { ErrorContext, VizHubError } from '../error';
import { wait } from './wait';
import { fetchStudioData } from './fetchStudioData';
import { reducer } from './reducer';
import { request, receive } from './actions';

export const useStudioData = vizId => {
  const [state, dispatch] = useReducer(reducer, {});
  const setError = useContext(ErrorContext);

  useEffect(() => {
    if (!state[vizId]) {
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
