import { useState, useEffect } from 'react';
import { sampleStudioData } from 'vizhub-core';

// This "Studio Data" means the initial API request for data
// to hydrate the page. This is _not_ the real-time synchronized data.
// For that, use the Viz context.
export const useStudioData = () => {
  const [studioData, setStudioData] = useState();
  useEffect(() => {
    setTimeout(() => {
      setStudioData(sampleStudioData);
    }, 1000);
  }, []);
  return studioData;
};
