import { getVizInfoForRequest } from './getVizInfoForRequest';

const vizReadAsync = async (context) => {
  const { collection, snapshots } = context;
  const vizInfo = await getVizInfoForRequest(collection, snapshots);
  console.log('vizInfo for request:');
  console.log(vizInfo && vizInfo.title);
};

export const vizRead = (context, next) => {
  try {
    vizReadAsync(context, next);
    next();
  } catch (error) {
    next(error);
  }
};
