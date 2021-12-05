import { getShareDBSnapshot } from './getShareDBSnapshot';

export const Gateways = (shareDBConnection) => ({
  // TODO refactor so there is only one definition of this
  // Other one is in
  getVizInfoSnapshot: getShareDBSnapshot(
    shareDBConnection,
    // TODO use constant
    'documentInfo'
  ),
  getVizContentSnapshot: getShareDBSnapshot(
    shareDBConnection,
    // TODO use constant
    'documentContent'
  ),
  getUserSnapshot: getShareDBSnapshot(
    shareDBConnection,
    // TODO use constant
    'user'
  ),
});
