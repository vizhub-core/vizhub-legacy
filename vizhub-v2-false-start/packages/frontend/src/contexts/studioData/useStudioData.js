import { useState, useEffect } from 'react';
import { oneSecond } from './oneSecond';

// This "Studio Data" means the initial API request for data
// to hydrate the page. This is _not_ the real-time synchronized data.
// For that, use the Viz context.
export const useStudioData = () => {
  const [studioData, setStudioData] = useState();
  useEffect(() => {
    Promise.all([
      fetch('/api/studio').then(data => data.json()),
      oneSecond() // Let the loading animation play.
    ]).then(([data]) => {
      setStudioData(data);
    });
  }, []);
  return studioData;
};
