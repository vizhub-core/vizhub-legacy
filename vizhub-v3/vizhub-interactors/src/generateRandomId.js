import { v4 as uuidV4 } from 'uuid';

// Generates a UUID v4 string with dashes removed (for ease of URL copying).
export const generateRandomId = () => uuidV4().replace(/-/g, '');
