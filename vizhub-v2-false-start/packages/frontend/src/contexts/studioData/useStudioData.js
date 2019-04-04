import { useState, useEffect, useContext } from 'react';
import { ErrorContext } from '../error';
import { wait } from './wait';
import { sampleStudioData } from 'vizhub-core';

// Convenience for stubbing out the backend during development.
const avoidBackend = true;

// This "Studio Data" means the initial API request for data
// to hydrate the page. This is _not_ the real-time synchronized data.
// For that, use the Viz context.
export const useStudioData = vizId => {
  const [studioData, setStudioData] = useState();
  const setError = useContext(ErrorContext);

  useEffect(() => {
    // If the vizId changed, clear out the old data
    // so the loading animation plays.
    setStudioData(undefined);

    Promise.all([
      fetch(`/api/studio/data/${vizId}`),
      wait(800) // Let the loading animation play.
    ]).then(([response]) => {
      if (avoidBackend) {
        setStudioData(sampleStudioData);
      } else if (!response.ok) {
        response.text().then(text => {
          setError({
            statusCode: response.status,
            title: response.statusText,
            message: text
          });
        });
      } else {
        response.json().then(setStudioData);
      }
    });
  }, [vizId]);

  return studioData;
};
