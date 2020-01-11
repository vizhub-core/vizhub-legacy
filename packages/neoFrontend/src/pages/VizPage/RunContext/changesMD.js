import { createChangesChecker } from './createChangesChecker';

// Returns true if the given op changes a .md file
// that is not bundle.js.
export const changesMD = createChangesChecker('.md');
