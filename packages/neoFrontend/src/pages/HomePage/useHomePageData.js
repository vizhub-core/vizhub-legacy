import { useState, useEffect } from 'react';
import { animationDelay, blankScreenDelay } from '../../LoadingScreen';

// TODO generalize this, use it on all pages:
// src/pages/VizPage/useVizPageData.js
// src/pages/CreateVizPage/useCreateVizPageData.js
const waitForSpinner = dataLoaded =>
  new Promise(resolve => {
    let animationStarted = false;

    const blankScreenTimeoutId = setTimeout(() => {
      animationStarted = true;
      setTimeout(() => {
        resolve();
      }, animationDelay);
    }, blankScreenDelay);

    dataLoaded.then(() => {
      if (!animationStarted) {
        clearTimeout(blankScreenTimeoutId);
        resolve();
      }
    });
  });

// TODO make an API request here.
export const useHomePageData = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dataLoaded = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 300);
    });
    waitForSpinner(dataLoaded).then(() => {
      setLoading(false);
    });
  }, []);
  return !loading;
};
