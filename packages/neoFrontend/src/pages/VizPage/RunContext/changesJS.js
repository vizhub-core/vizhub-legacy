import { createChangesChecker } from './createChangesChecker';

// Returns true if the given op changes a .js file
// that is not bundle.js.
export const changesJS = createChangesChecker('.js');
