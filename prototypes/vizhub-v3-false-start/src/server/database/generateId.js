import { v4 as uuidV4 } from 'uuid';

// Generates a unique id for vizzes.
// Uses uuid v4, removes dashes.
export const generateId = () => uuidV4().replace(/-/g, '');
