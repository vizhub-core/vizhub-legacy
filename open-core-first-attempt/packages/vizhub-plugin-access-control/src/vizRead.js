import { VizHubError } from 'vizhub-core';
import { getVizInfoForRequest } from './getVizInfoForRequest';

const { ERR_NOT_FOUND, ERR_PERMISSION_DENIED } = VizHubError.codes;

export const vizRead = (gateways) => async (context, next) => {
  try {
    // Unpack ShareDB context.
    const { agent, collection, snapshots } = context;

    // Let the server do whatever it wants, because
    // on the server there is no untrusted code.
    console.log(agent.isServer);
    if (agent.isServer) {
      return next();
    }

    const vizInfo = await getVizInfoForRequest({
      collection,
      snapshots,
      gateways,
    });

    if (!vizInfo) {
      return next(new VizHubError(ERR_NOT_FOUND));
    }

    // TODO allow reads if owner is authenticated.
    if (vizInfo.privacy === 'private') {
      return next({ message: 'Message', code: 'code' });
    }

    next();
  } catch (error) {
    next(error);
  }
};
