export const vizWidth = 960;
export const defaultVizHeight = 500;

export const showSpinner = process.env.NODE_ENV !== 'development';
//export const showSpinner = true;

// Disable transitions in developme
// so that they don't interfere with tests.
// And yes do they interfere. Badly. Watch out!
//export const useTransitions = process.env.NODE_ENV !== 'development';
export const useTransitions = true;
