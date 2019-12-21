import { identifyAgent } from './identifyAgent';
import { accessControl } from './accessControl';
import { getVizInfo } from './getVizInfo';
import { getConnection } from 'vizhub-server-gateways';

export const shareDBMiddleware = shareDB => {
  shareDB.use('connect', identifyAgent);

  shareDB.use('apply', getVizInfo(getConnection()));
  shareDB.use('apply', accessControl);

  //shareDB.use('readSnapshots', getVizInfo(getConnection()));
  //shareDB.use('readSnapshots', accessControlRead);
};
