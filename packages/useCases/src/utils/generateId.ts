import * as uuidV4 from 'uuid/v4';
export const generateId = () => uuidV4().replace(/-/g, '');
