import { getConnection } from 'vizhub-server-gateways';
import { identifyAgent } from './identifyAgent';
import { getVizInfo } from './getVizInfo';
import { vizRead, vizWrite } from './accessControl';

export const shareDBMiddleware = shareDB => {
  shareDB.use('connect', identifyAgent);

  shareDB.use('apply', getVizInfo(getConnection()));
  shareDB.use('apply', vizWrite);

  //shareDB.use('readSnapshots', getVizInfo(getConnection()));
  shareDB.use('readSnapshots', vizRead);
};
