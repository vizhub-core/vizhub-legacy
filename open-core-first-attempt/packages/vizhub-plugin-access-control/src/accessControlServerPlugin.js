import { vizRead } from './vizRead';
import { vizWrite } from './vizWrite';

export const accessControlServerPlugin = () => ({
  extendServer: ({ shareDBBackend, gateways }) => {
    // See https://share.github.io/sharedb/middleware/
    shareDBBackend.use('readSnapshots', vizRead(gateways));

    // Note: The snapshot has not yet been fetched.
    //If you want to make any changes or assertions involving the snapshot,
    //that should be done in the apply or commit hooks.
    // TODO We might want to use('apply', vizWrite), so that we can
    // access the snapshot which contains ownership and collaborator permissions.
    shareDBBackend.use('submit', vizWrite);
  },
});
