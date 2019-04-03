import { useState, useEffect } from 'react';
import { wait } from './wait';

// This "Studio Data" means the initial API request for data
// to hydrate the page. This is _not_ the real-time synchronized data.
// For that, use the Viz context.
export const useStudioData = vizId => {
  const [studioData, setStudioData] = useState();

  useEffect(() => {
    // If the vizId changed, clear out the old data
    // so the loading animation plays.
    setStudioData(undefined);

    Promise.all([
      fetch(`/api/studio/data/${vizId}`).then(data => data.json()),
      wait(800) // Let the loading animation play.
    ])
      .then(([data]) => {
        setStudioData(data);
      })
      .catch(error => {
        console.log('Error while fetching studio data');
        throw error;
      });
  }, [vizId]);

  return studioData;
};
