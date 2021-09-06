import { VizHubError } from 'vizhub-core';
import { getVizInfoForRequest } from './getVizInfoForRequest';

const { ERR_NOT_FOUND, ERR_PERMISSION_DENIED } = VizHubError.codes;

export const vizRead = (gateways) => async (context, next) => {
  try {
    const { collection, snapshots } = context;
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
      return next(new VizHubError(ERR_PERMISSION_DENIED));
    }

    next();
  } catch (error) {
    next(error);
  }
};
