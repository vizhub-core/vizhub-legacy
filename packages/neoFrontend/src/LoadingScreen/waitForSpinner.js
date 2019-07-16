import { animationDelay, blankScreenDelay } from './animationDelay';

// TODO generalize this, use it on all pages:
// src/pages/VizPage/useVizPageData.js
// src/pages/CreateVizPage/useCreateVizPageData.js
export const waitForSpinner = dataLoaded =>
  new Promise(resolve => {
    let animationStarted = false;

    const blankScreenTimeoutId = setTimeout(() => {
      animationStarted = true;
      setTimeout(() => {
        dataLoaded.then(resolve);
      }, animationDelay);
    }, blankScreenDelay);

    dataLoaded.then(data => {
      if (!animationStarted) {
        clearTimeout(blankScreenTimeoutId);
        resolve(data);
      }
    });
  });
