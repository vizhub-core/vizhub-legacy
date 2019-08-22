export const vizWidth = 960;
export const defaultVizHeight = 500;

const isDev = process.env.NODE_ENV !== 'development';

export const showSpinner = isDev;
//export const showSpinner = true;

// Disable transitions in developme
// so that they don't interfere with tests.
// And yes do they interfere. Badly. Watch out!
export const useTransitions = isDev;
//export const useTransitions = true;
