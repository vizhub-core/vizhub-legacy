import { animationDelay, blankScreenDelay } from './animationDelay';

export const waitForSpinner = (dataLoaded, minSpinnerTime) =>
  new Promise(resolve => {
    let animationStarted = false;

    // If the optional argument minSpinnerTime is set,
    // then display the spinner for at least that long (ms).
    if (minSpinnerTime) {
      setTimeout(() => {
        dataLoaded.then(resolve);
      }, minSpinnerTime);
    } else {
      // If the dataLoaded promise resolves after blankScreenDelay ms elapsed,
      const blankScreenTimeoutId = setTimeout(() => {
        // then the spinner is shown for animationDelay ms.
        // This is to avoid a "spinner flash" - allow users to perceive the spinner.
        animationStarted = true;
        setTimeout(() => {
          dataLoaded.then(resolve);
        }, animationDelay);
      }, blankScreenDelay);

      dataLoaded.then(data => {
        // If the dataLoaded promise resolves before blankScreenDelay ms elapsed,
        if (!animationStarted) {
          // then the spinner is never shown.
          // This is to avoid a "spinner flash" - don't show the spinner if the user
          // will not have time to perceive it.
          clearTimeout(blankScreenTimeoutId);
          resolve(data);
        }
      });
    }
  });
