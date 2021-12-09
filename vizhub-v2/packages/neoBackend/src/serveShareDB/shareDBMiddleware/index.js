import { identifyAgent } from './identifyAgent';
import { vizRead, vizWrite } from './accessControl';

export const shareDBMiddleware = (shareDB) => {
  shareDB.use('connect', identifyAgent);
  shareDB.use('apply', vizWrite);
  shareDB.use('readSnapshots', vizRead);
};
