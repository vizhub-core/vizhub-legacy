import { combineReducers } from 'redux';

import { files } from './files';
import { activeFileName } from './activeFileName';
import { visualizationWidth } from './visualizationWidth';
import { visualizationHeight } from './visualizationHeight';
import { visualizationOwnerUser } from './visualizationOwnerUser';
import { runId } from './runId';
import { saveStatus } from './saveStatus';
import { visualizationTitle } from './visualizationTitle';
import { visualizationId } from './visualizationId';
import { visualizationDescription } from './visualizationDescription';
import { splitPaneDragging } from './splitPaneDragging';

export const ide = combineReducers({
  files,
  activeFileName,
  visualizationWidth,
  visualizationHeight,
  visualizationOwnerUser,
  runId,
  saveStatus,
  visualizationTitle,
  visualizationId,
  visualizationDescription,
  splitPaneDragging
});
