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

export const clearConsole = true; //isProd;

export const enterFullScreenTooltip = 'Full Screen Mode';
export const enterMiniModeTooltip = 'Mini Mode';
export const exitFullScreenTooltip = 'Exit Full Screen Mode';
export const exitMiniModeTooltip = 'Exit Mini Mode';

export const codeEditorHeaderCloseTooltip = 'Close Code Editor';
export const codeEditorHeaderEnterFullEditorTooltip = 'Full Code Mode';
export const codeEditorHeaderExitFullEditorTooltip = 'Exit Full Code Mode';

export const sidebarSettingsTooltip = 'Settings';
export const sidebarNewTooltip = 'New';
export const sidebarExportTooltip = 'Export';
