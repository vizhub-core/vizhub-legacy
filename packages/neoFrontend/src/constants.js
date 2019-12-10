export const vizWidth = 960;
export const defaultVizHeight = 500;

const isProd = process.env.NODE_ENV !== 'development';

// The minimum time that the interstitial spinner is shown to the user.
// Allow the tests to run fast in development.
// Force the user to perceive the loading screen message in production.
export const minSpinnerTime = isProd ? 2000 : 0;

//export const showSpinner = true;

// Disable transitions in developme
// so that they don't interfere with tests.
// And yes do they interfere. Badly. Watch out!
export const useTransitions = isProd;
//export const useTransitions = true;

export const clearConsole = isProd;

// TODO reduce duplication between here and packages/database/src/collectionName.js
export const DOCUMENT_CONTENT = 'documentContent';
export const DOCUMENT_INFO = 'documentInfo';
