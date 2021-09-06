import { getVizInfoForRequest } from './getVizInfoForRequest';

const vizReadAsync = async ({ context, gateways }) => {
  const { collection, snapshots } = context;
  const vizInfo = await getVizInfoForRequest({
    collection,
    snapshots,
    gateways,
  });
  console.log('vizInfo for request:');
  console.log(vizInfo && vizInfo.title);
};

export const vizRead = (gateways) => (context, next) => {
  try {
    vizReadAsync({ context, gateways });
    next();
  } catch (error) {
    next(error);
  }
};
