export const vizWidth = 960;
export const defaultVizHeight = 500;

const isProd = process.env.NODE_ENV !== 'development';

export const showSpinner = isProd;
//export const showSpinner = true;

// Disable transitions in developme
// so that they don't interfere with tests.
// And yes do they interfere. Badly. Watch out!
export const useTransitions = isProd;
//export const useTransitions = true;

export const clearConsole = isProd;

// TODO reduce duplication between here and packages/database/src/collectionName.js
export const DOCUMENT_CONTENT = 'documentContent';
