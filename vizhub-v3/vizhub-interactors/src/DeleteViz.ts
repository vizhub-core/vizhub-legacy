import { VizId, VizInfo } from 'vizhub-entities';
import { Gateways } from './Gateways';

export const DeleteViz = (gateways: Gateways) => {
  const {
    getVizInfoSnapshot,
    saveVizInfo,
    deleteVizInfo,
    deleteVizContent,
    getForks,
  } = gateways;

  return async (vizId: VizId): Promise<void> => {
    // If the viz is not found, getVizInfoSnapshot will throw,
    // so we can access .data on the result without risk of crashing.
    const vizInfo = (await getVizInfoSnapshot(vizId)).data;
    const { forkedFrom } = vizInfo;

    // For each fork forked from the viz to be deleted,
    // update its forkedFrom reference to the viz that the
    // viz to be deleted was forked from (tree node removal).
    const forks: Array<VizInfo> = (await getForks(vizId)).map(
      (snapshot) => snapshot.data
    );

    // TODO consider the possibility of a race condition here.
    // Thought experiment: What if during the time between when
    // `forks` is fetched and when all of these `updateForkedFrom`
    // calls, one of the `forks` entries is deleted?
    // Should we use an async lock for this critical section?
    // It would only need to be local to DeleteViz.
    // Possible to construct a test case that triggers this race condition?
    // Elegant solution here https://medium.com/@chris_marois/asynchronous-locks-in-modern-javascript-8142c877baf
    const updateForkedFrom = (fork) => saveVizInfo({ ...fork, forkedFrom });
    await Promise.all(forks.map(updateForkedFrom));
    await Promise.all([deleteVizInfo(vizId), deleteVizContent(vizId)]);
  };
};
