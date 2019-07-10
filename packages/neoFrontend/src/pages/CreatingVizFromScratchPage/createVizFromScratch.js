import { AUTH_PENDING } from '../../authentication';
import { fetchCreateVizFromScratch } from './fetchCreateVizFromScratch';

export const createVizFromScratch = async me => {
  if (me === AUTH_PENDING) {
    return;
  }
  const { error, id } = await fetchCreateVizFromScratch();
  if (error) {
    console.log(error);
  } else {
    console.log('route to ' + me.userName + '/' + id);
    //Router.push(vizRoute({ id, userName }));
  }
};
